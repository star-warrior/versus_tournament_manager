import e, { Router } from "express";
import { pool } from "../db/pool.js";

const app = e();
const router = e.Router();


//! Player Routes


// Find Players by Tournament ID

router.get("/find/tournament/:id", (req, res) => {
    const tournamentId = req.params.id;
    console.log(tournamentId)

    if (!tournamentId || tournamentId === 'undefined') {
        return res.status(400).json({ error: "Invalid tournament ID" });
    }

    pool.query(`SELECT * FROM players WHERE tournament_id = $1`, [tournamentId], (err, result) => {
        if (err) {
            console.log("Error fetching players: ", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.rows.length === 0) {
            return res.status(200).json({ error: "No players found" });
        }

        res.status(200).json({ players: result.rows });
    })
})


// Upload Players by Tournament ID

router.post('/add/tournament/:id', (req, res) => {
    const tournamentId = req.params.id;
    const playerData = req.body.playerData;

    // console.log(tournamentId);
    // console.log(playerData);

    if (!tournamentId || tournamentId === 'undefined') {
        return res.status(400).json({ error: "Invalid tournament ID" });
    }

    if (!playerData || !Array.isArray(playerData) || playerData.length === 0) {
        return res.status(400).json({ error: "No players to add" });
    }

    try {

        for (const player of playerData) {
            pool.query(`INSERT INTO players (name, email_id, contact_number, seed, tournament_id) VALUES ($1, $2, $3, $4, $5) on conflict(name, tournament_id) do nothing`, [player.Name, player.Email, player.Phone, player.Seed, tournamentId])

        }

        res.status(200).json({ message: "Players added successfully" })
        console.log("Players added successfully");


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})



export default router;








