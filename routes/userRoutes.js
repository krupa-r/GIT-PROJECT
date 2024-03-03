const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Ride = require('../models/ride');
const session = require('express-session');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 8),
            phone
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        return res.status(200).send('Login successful');
    } catch (error) {
        res
            .status(500)
            .send('Something went wrong. Please try again later.');
    }
});

router.post('/findride', async (req, res) => {
    const {from, to, date} = req.body;
    try {
        const ride = new Ride({
            from,
            to,
            dateTime: date
        });
        await ride.save();
        res.status(201).send(ride);
    } catch (error) {
        res.status(400).send(error);
    }
    

});

module.exports = router;