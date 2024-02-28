// pages/api/orders.js
import { getDatabasePool } from '../classes/Database'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { role, id } = req.query;

    let orders;
    if (role === 'admin') {
      orders = await read('orders');
    } else if (role === 'customer') {
      orders = await read('orders', { column: 'user_id', value: id });
    } else {
      orders = [];
    }

    res.status(200).json(orders);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}