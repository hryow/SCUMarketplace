const express = require('express');
const router = express.Router();

// Import controller (both user and listings)
const controller = require('../controllers/controller');

// Route to create a new user
router.post('/createuser', controller.createUser);

// Route for user login
router.post('/login', controller.login);

// Route to create a new listing
router.post('/createlisting', controller.createListing);

// Route for fetching all listings
router.get('/getlistings', controller.getListings);

// Export router to use (index.js)
module.exports = router;
