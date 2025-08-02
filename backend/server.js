import env from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';// Import the pool for database connection
import passport from 'passport';
import './utils/Passport.js';
import tournamnt_routes from "./routes/tournament_routes.js";
import updateTournament from "./routes/updateTournament.js";
import playerRoutes from "./routes/playerRoutes.js";

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


//! API Routes

//? Custom Routes

app.use('/api/tournament', tournamnt_routes)

// TOurnament Update Routes.

app.use('/api/updateTournament', updateTournament)

// Player Routes

app.use('/api/player', playerRoutes)



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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


