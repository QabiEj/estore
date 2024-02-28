// api/routes/users.js
const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    // Validate inputs
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'Fullname, email and password are required!' });
    }

    try {
        // Create user
        const user = await UserService.createUser({ fullname, email, password });

        // On success, return user
        return res.status(201).json(user);
    } catch (error) {
        // On error, return message
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;