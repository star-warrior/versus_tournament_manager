// utils/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import env from "dotenv";
import { pool } from "../db/pool.js" // Import the pool for database connection
env.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            pool.query(
                "SELECT * FROM users WHERE google_id = $1",
                [profile.id],
                (err, result) => {
                    if (err) {
                        console.error("Database query error:", err);
                        return done(err);
                    }
                    if (result.rows.length > 0) {
                        // User exists
                        return done(null, result.rows[0]);
                    } else {
                        // Create new user
                        const newUser = {
                            google_id: profile.id,
                            displayName: profile.displayName,
                            email: profile.emails[0].value,
                            photo: profile.photos[0].value,
                            loginMethod: "google",
                        };
                        pool.query(
                            "INSERT INTO users (google_id, name, email, profile_pic, login_method) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                            [newUser.google_id, newUser.displayName, newUser.email, newUser.photo, newUser.loginMethod],
                            (insertErr, insertResult) => {
                                if (insertErr) {
                                    console.error("Insert error:", insertErr);
                                    return done(insertErr);
                                }
                                return done(null, insertResult.rows[0]);
                            }
                        );
                    }
                }
            );
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id); // or user.google_id
});

passport.deserializeUser((id, done) => {
    pool.query(
        "SELECT * FROM users WHERE id = $1", // or google_id
        [id],
        (err, result) => {
            if (err) return done(err);
            if (result.rows.length > 0) {
                done(null, result.rows[0]);
            } else {
                done(null, false);
            }
        }
    );
});
