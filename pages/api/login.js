// pages/api/login.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }

        // Perform login
        // This is just a mock, replace it with your actual login logic
        if (email === 'test@test.com' && password === 'password') {
            // On success, return a success response
            return res.status(200).json({ message: 'Login successful!' });
        } else {
            // On failure, return an error response
            return res.status(401).json({ message: 'Invalid email or password!' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}