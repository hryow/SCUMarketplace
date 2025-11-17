const express = require('express');
const { db } = require('pg');

const app = express();
const port = 8000;

// FOR TESTING PURPOSES ONLY
// REMOVE LATER
let id = 4;
const mockListingsData = [
    {
        id: '1',
        title: 'Ugly Labubu',
        price: '67.99',
        description: 'Good condition. Box not included.',
        photo: 'https://placehold.co/400x300/F0F8FF/333?text=Labubu+Photo+1',
        location: 'Swig',
        email: 'peepeepoopoo@scu.edu'
    },
    {
        id: '2',
        title: 'Rare Vinyl Record (Taylor Swift)',
        price: '350.00',
        description: 'Limited edition pressing, still sealed. A collector\'s item!',
        photo: 'https://placehold.co/400x300/FFD700/000?text=Vinyl+Record',
        location: 'University Villas',
        email: 'sixsevennn@scu.edu'
    },
    {
        id: '3',
        title: 'Barely Used Blender',
        price: '25.00',
        description: 'Perfect for smoothies! Selling because I upgraded.',
        photo: 'https://placehold.co/400x300/ADD8E6/000?text=Blender+Image',
        location: 'Finn',
        email: 'gymrat234@scu.edu'
    }
];

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
        console.log('[API] email, name, profile picture, or biography is missing');
        return res.status(400).json({
            error: 'email, name, profile picture, or biography is missing'
        });
    }
    // add all of the fields to the db
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
    const { title, price, description, photo, location, email } = req.body;
    if(!title || !price || !description || !photo || !location || !email){
        console.log('[API] Title, price, description, photo, location, or email is missing');
        return res.status(400).json({
            error: 'Title, price, description, photo, location, or email is missing'
        });
    }
    // something something to generate a lid
    // add new listing to the db
    // return a response (on success and for any errors);

    //MOCK DB TEST
    const newId = id;
    id++;
    const newListing = {
        id: newId,
        title: title,
        price: price,
        photo: photo,
        location: location,
        email: email
    };
    mockListingsData.push(newListing);
    console.log(`[API] Successfully created new listing: ${newListing.title}`);
     res.status(201).json({
        message: 'Listing created successfully',
    });
})

// GET/FETCH - Retrieve listing data
app.get('/api/getlistings', (req, res) => {
    // get all listing data from db
    // loop to parse everything into an array

    // TEST FROM MOCK DB
    const listings = mockListingsData;
    console.log(`[API] Serving ${listings.length} listings.`);
    res.status(200).json(listings);
});

// DELETE - Delete specific listing
// Implement if needed. Otherwise disregard.
// Since professor is wondering what happens when a listing is sold
app.delete('api/listings/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        console.log('[API] Missing id');
        return res.status(400).json({
            error: 'Missing id'
        });
    }
    // delete listing with the matching id in the db (if applicable)

    // TEST FROM MOCK DB
    // check if the listing exists in db
    const foundListing = mockListingsData.find(mockListingsData => mockListingsData.id === id);
    if(!foundListing){
        console.log('[API] Listing not found/does not exist');
        return res.status(400).json({
            error: 'Listing does not exist'
        });
    }
    console.log(foundListing); // prints listing to delete's data 
    const listingIdx = mockListingsData.indexOf(mockListingsData => mockListingsData.id === id);
    mockListingsData.splice(listingIdx, 1);
    console.log(mockListingsData); // show changes
    return res.status(201).json({
        message: 'Listing deleted successfully'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})