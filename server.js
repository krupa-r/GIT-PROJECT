const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');
const Ride = require('./models/ride');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const multer = require('multer');


const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://ribhav:0X0aHo5xkC4tnVGE@rides.gnlppuu.mongodb.net/?retryWrites=true&w=majority&appName=rides", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "views/")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup-driver', (req, res) => {
    res.render('signup-driver');
});

app.get('/login-driver', (req, res) => {
    res.render('login-driver');
});

app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});