const express = require('express');
const { db } = require('pg');

const app = express();
const port = 8000;

// Establish connection with database pool 

// Middleware for parsing JSON
app.use(express.json());

// POST - Create new user
/*
    Sample user body:
        email: jdoe67@scu.edu
        name: Jane Doe
        pfp: insert url
        bio: blah blah blah im so epic
*/
app.post('/api/createuser', (req, res) =>{
    // keeping all fields required for now
    const { email, name, pfp, bio} = req.body;
    if(!email || !name|| !pfp || !bio){
        console.log('email, name, profile picture, or biography is missing');
        return res.status(400).json({
            error: 'email, name, profile picture, or biography is missing'
        });
    }
});

// POST - Create new Listing
// Will be associated with current user 
/*
    Sample listing body:
        title: Ugly Labubu
        price: 67.99
        description: good conditon!
        photo: insert url(s)
        location: Swig
*/
app.post('/api/createlisting', (req, res) => {
    const { title, price, description, photo, location } = req.body;
    if(!title || !price || !description || !photo || !location){
        console.log('Title, price, description, photo, or location is missing');
        return res.status(400).json({
            error: 'Title, price, description, photo, or location is missing'
        });
    }
    // something something to generate a lid
    // add new listing to the db
    // return a response (on success and for any errors);
})

// GET/FETCH - Retrieve listing data
app.get('/api/getlistings', (req, res) => {

});

// DELETE - Delete specific listing
// Implement if needed. Otherwise disregard.
// Since professor is wondering what happens when a listing is sold
app.delete('api/listings/:id', (req, res) => {

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})