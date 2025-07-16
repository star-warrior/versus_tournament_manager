import { Pool } from 'pg';
// Postgres Setup
export const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'drawMaker',
    password: process.env.POSTGRES_PASSWORD || 'postgres16',
    port: process.env.POSTGRES_PORT || 5432,
});

pool.connect();