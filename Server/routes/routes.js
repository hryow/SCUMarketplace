const express = require('express');
const router = express.Router();
// Import controller (both user and listings)
const controller = require('../controllers/controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imgs/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to create a new user
router.post('/createuser', controller.createUser);
// Route for user login
router.post('/login', controller.login);

// Route to create a new listing
router.post('/createlisting', upload.single('photo'), controller.createListing);

// Route for fetching all listings
router.get('/getlistings', controller.getListings);

// Route for fetching a singular listing
router.get('/getlistings/:id', controller.getSingleListing); // <-- Restore this

// Route for deleting listing
router.delete('/deletelisting/:id', controller.deleteListing); // <-- Restore this

// Export router to use (index.js)
module.exports = router;



