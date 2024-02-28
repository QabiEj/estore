// pages/api/product.js
import { getDatabasePool } from '../classes/Database'; 

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const pool = getDatabasePool();
        const client = await pool.connect();
        try {
            const product = await client.query('SELECT * FROM products WHERE id = $1', [id]);

            if (product.rows.length > 0) {
                res.status(200).json(product.rows[0]);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } finally {
            client.release();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}