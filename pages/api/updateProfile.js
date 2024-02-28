// pages/api/updateProfile.js
import { getDatabasePool } from '../classes/Database'; 

export default async function handler(req, res) {
  const { name, surname, phone, address } = req.body;

  // Validate the data
  if (!name || !surname || !phone || !address) {
    res.status(400).json({ errors: ['All fields are required'] });
    return;
  }

  // Update the profile in the database
  try {
    await updateProfileInDatabase({ name, surname, phone, address });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
}
