const express = require('express');
const bcrypt = require('bcryptjs');
const Driver = require('../models/driver');
const tesseract = require('node-tesseract-ocr');
const multer = require('multer');
const path = require('path');

const router = express.Router();
// Create storage options with explicit destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

        const upload = multer({ storage: storage }); // Create Multer instance with storage


    
    router.post('/signup', upload.single('myFile'), async (req, res) => {
        const config = {
            lang: "eng",
            oem: 3,
            psm: 4,
          }

        const text = await tesseract.recognize(req.file.path, config); 
        const { name, email, password, phone, license, company } = req.body;
        const lines = text.replace(/[^\w\s]/g, ' ').split('\n').filter(line => line.trim() !== '');
        const birthLineIndex = lines.findIndex(line => line.includes('birth'));
        const dob = lines[birthLineIndex + 1].replace(/\r/g, '');
        const lastFourDigits = parseInt(dob.slice(-4));
        if (lastFourDigits >= 2006) {
            return res.status(400).send('You must be at least 16 years old to sign up');
        }
        try {
            const driver = new Driver({
                name,
                email,
                password: await bcrypt.hash(password, 8),
                phone,
                license,
                company
            });

            await driver.save();
            res.status(200).send(driver);
    
        } catch (error) {
            res.status(400).send(error);
        }
         
    });
        
    
    


router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const driver = await Driver.findOne({ name });
        if (!driver) {
            return res.status(404).send('Driver not found');
        }
        const isMatch = await bcrypt.compare(password, driver.password);
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

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;