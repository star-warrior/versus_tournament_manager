import e, { Router } from "express";
import { pool } from "../db/pool.js";

const app = e();
const router = e.Router();

app.patch('/updateTournament', (req, res) => {
    const { tournamentId } = req.body;
    const { tournamentName } = req.body;
    const { tournamentDescription } = req.body;
    const { tournamentDate } = req.body;
    const { tournamentTime } = req.body;
    const { tournamentLocation } = req.body;
})


export default router;