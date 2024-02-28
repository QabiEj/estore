// pages/api/products/[id].js
import { create, read, update, del, search } from '../classes/CRUD';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        if (req.method === 'POST') {
            const { category, name, qty, discount, price, description, image } = req.body;

            const data = {
                user_id: req.session.id, // Replace with actual session id
                category_id: category,
                name,
                qty,
                discount,
                price,
                description,
                image,
            };

            const result = await update('products', id, data);

            if (result) {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(500).json({ error: 'Something went wrong!' });
            }
        } else if (req.method === 'GET') {
            const product = await read('products', id);
            res.status(200).json(product);
        } else if (req.method === 'DELETE') {
            // Delete image file here if necessary

            const result = await del('products', id);

            if (result) {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(500).json({ error: 'Something went wrong!' });
            }
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}