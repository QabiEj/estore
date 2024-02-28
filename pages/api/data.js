// pages/api/data.js
import { getDatabasePool } from './classes/Database';

export default async function handler(req, res) {
    const pool = getDatabasePool();

    try {
        const result = await pool.query('SELECT * FROM your_table');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}