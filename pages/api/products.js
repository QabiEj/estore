// pages/api/products.js
import { getDatabasePool } from '../classes/Database'; 
export default async function handler(req, res) {
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

        const result = await create('products', data);

        if (result) {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(500).json({ error: 'Something went wrong!' });
        }
    } else if (req.method === 'GET') {
        const { filter } = req.query;

        // Fetch products
        // This is just a placeholder, replace it with your actual logic to fetch products
        let products = [];

        // Filter products
        // This is just a placeholder, replace it with your actual logic to filter products
        const filteredProducts = products.filter((product) => product.name.includes(filter));

        // Return products
        return res.status(200).json(filteredProducts);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}