// pages/api/updateCategory.js
import { getDatabasePool } from '../classes/Database'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is empty!' });
    }

    try {
      const category = await read('categories', id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found!' });
      }

      const result = await update('categories', id, { name });

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