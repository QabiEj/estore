// pages/api/updatePassword.js
import { getDatabasePool } from '../classes/Database'; 

export default async function handler(req, res) {
  const { password1, password2 } = req.body;

  // Validate the data
  if (!password1 || !password2 || password1 !== password2) {
    res.status(400).json({ errors: ['Passwords are required and should match'] });
    return;
  }

  // Update the password in the database
  try {
    await updatePasswordInDatabase(password1);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
}