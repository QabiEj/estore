// pages/api/promotions/[id].js
import { update, read } from '../classes/CRUD';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'POST') {
        const { title, subtitle, is_active, image } = req.body;

        const data = {
            title,
            subtitle,
            is_active,
            image,
        };

        const result = await update('promotions', id, data);

        if (result) {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(500).json({ error: 'Something went wrong!' });
        }
    } else if (req.method === 'GET') {
        const promotion = await read('promotions', id);
        res.status(200).json(promotion);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}