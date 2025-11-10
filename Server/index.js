const express = require('express');
const { db } = require('pg');

const app = express();
const port = 8000;

// Establish connection with database pool 

// Middleware for parsing JSON
app.use(express.json());

// POST - Create new user
app.post('/api/user', (req, res) =>{

});

// POST - Create new Listing
// Will be associated with current user 
app.post('/api/listings', (req, res) => {

})

// GET/FETCH - Retrieve listing data
app.get('/api/listings', (req, res) => {

});

// DELETE - Delete specific listing
// Implement if needed. Otherwise disregard.
// Since the professor is wondering what happens when a listing is sold
app.delete('api/listings/:id', (req, res) => {

});