// pages/api/categories.js
import { getDatabasePool } from '../classes/Database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await read('categories');
      res.status(200).json(categories);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const result = await remove('categories', id);

      if (result) {
        res.status(200).json({ status: 'success' });
      } else {
        res.status(500).json({ error: 'Something went wrong!' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}