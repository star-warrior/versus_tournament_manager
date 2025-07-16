import e, { Router } from "express";
import { pool } from "../db/pool.js";

const app = e();
const router = e.Router();


//! Tournament Routes

router.get('/', (req, res) => {
    pool.query("select * from tournament where createdby = $1", [req.user.google_id], (err, results) => {
        if (err) {
            console.error("Error fetching tournaments:", err);
            return res.status(500).json({ error: "Internal server error" });
        } else {
            res.json({ tournaments: results.rows, meassage: "Tournaments fetched" })
            // console.log("Tournaments: ", results.rows);
        }
    })
})

router.post('/', (req, res) => {
    const { name, description, sport, date, location, picture } = req.body;
    console.log(req.user);

    try {
        pool.query("Insert into tournament (name,sport,dateOfTournament, createdBy, picture,description) VALUES ($1, $2, $3, $4, $5, $6) ", [name, sport, date, req.user.google_id, picture, description], (err, result) => {
            if (err) {
                console.log("Creating Tournament Error: ", err);
                return res.status(500).json({ error: "Failed to create tournament" });
            }
            res.status(201).json({
                message: "Tournament created successfully",
                tournament: result.rows[0]
            });
        })
    } catch (err) {
        console.log(err);
    }
})


export default router;