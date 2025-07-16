import env from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';// Import the pool for database connection
import passport from 'passport';
import './utils/Passport.js';
import multer from 'multer';
import path from 'path';
import tournamnt_routes from "./routes/tournament_routes.js"



env.config();

const app = express();

// Middleware setup
app.use(cors({
    origin: "http://localhost:5173", // Your React app URL
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "lax", // or "none" if using HTTPS
        secure: false,   // true if using HTTPS
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


// Import routes
const PORT = process.env.PORT || 3000;

// Multer setup for file uploads


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) =>
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.csv' || ext === '.xlsx' || ext === '.xls') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV and Excel files are allowed'));
    }
};

const upload = multer({ storage, fileFilter });



//! API Routes

//? Custom Routes

app.use('/api/tournament', tournamnt_routes)

app.get('/api/product', (req, res) => {
    res.json({ meassage: "Hello World" })
})

// Authentication Routes

// Auth routes
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
        successRedirect: "http://localhost:5173/dashboard",
    })
);

app.get("/auth/user", (req, res) => {

    console.log(req.user);
    console.log(req.session)
    if (!req.user) return res.send(null);
    const user = {
        displayName: req.user.name,
        emails: [{ value: req.user.email }],
        photos: [{ value: req.user.profile_pic }],
    };
    res.send(user);
});

app.get("/auth/logout", (req, res) => {
    req.logout(() => {
        // Callback after logout (for Passport >=0.6.0)
        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // Name may vary depending on your session config
            res.send({ success: true, message: "Logged out" });
        });
    });
});

//! Tournament Routes

app.get('/api/tournament/:id', (req, res) => {
    const tournamentId = req.params.id;
    pg.query("select * from tournament where id = $1", [tournamentId], (err, results) => {
        if (err) {
            console.error("Error fetching tournament:", err);
            return res.status(500).json({ error: "Internal server error" });
        } else if (results.rows.length === 0) {
            return res.status(404).json({ error: "Tournament not found" });
        } else {
            res.json({ tournament: results.rows[0], message: "Tournament fetched" });
        }
    });
})

app.post("/api/tournament/:id/upload-csv", upload.single('file'), (req, res) => {
    const tournamentId = req.params.id;
    // Handle CSV upload logic here

    if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
    }


    // For example, parse the CSV file and update the tournament data in the database
    res.json({ message: `CSV uploaded for tournament ${tournamentId}` });
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


