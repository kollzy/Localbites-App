

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(400).send("Error registering user");
    }
});


module.exports = router;
