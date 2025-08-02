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
            res.json({ tournaments: results.rows, message: "Tournaments fetched" })
            // console.log("Tournaments: ", results.rows);
        }
    })
})

// Create Tournament

router.post('/', (req, res) => {
    const { name, description, sport, date, location, picture, prize, city, state, banner } = req.body;
    console.log(req.user);

    try {
        pool.query("Insert into tournament (name,sport,dateOfTournament, createdBy, picture,description,prize, location ,city,state, banner_pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ", [name, sport, date, req.user.google_id, picture, description, prize, location, city, state, banner], (err, result) => {
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


// Custom Search For Player's City or State

router.get('/filter', (req, res) => {
    const { city, state, sport } = req.query;
    console.log(city, state, sport);

    let filters = [];
    let values = []
    let idx = 1;

    if (city) {
        filters.push(`LOWER(city) = LOWER($${idx})`);
        values.push(city);
        idx++;
    }
    if (state) {
        filters.push(`LOWER(state) = LOWER($${idx})`);
        values.push(state);
        idx++;
    }
    if (sport) {
        filters.push(`LOWER(sport) = LOWER($${idx})`);
        values.push(sport);
        idx++;
    }


    const query = filters.length > 0 ? " WHERE " + filters.join(" AND ") : "";

    try {
        pool.query(`select * from tournament ${query}`, values, (err, result) => {
            if (err) {
                console.log("Error fetching tournaments: ", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            res.status(201).json({
                meassage: "Tournaments Fetched Succesfully",
                tournaments: result.rows
            })
        });

    } catch (error) {
        console.log("Could Not find Any tournaments!")
    }

})



// Get single tournament by ID
router.get('/:id', (req, res) => {
    const tournamentId = req.params.id;

    pool.query("SELECT * FROM tournament WHERE id = $1", [tournamentId], (err, results) => {
        if (err) {
            console.error("Error fetching tournament:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        res.json({
            tournament: results.rows[0],
            message: "Tournament fetched successfully"
        });
    });
});

// Delete a Tournament

router.get('/delete/:id', (req, res) => {

    const tournamentId = req.params.id;

    pool.query("DELETE FROM tournament WHERE id = $1", [tournamentId], (err, result) => {
        if (err) {
            console.error("Error deleting tournament:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        res.status(200).json({
            message: "Tournament deleted successfully"
        });
    })
})



export default router;