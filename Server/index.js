const express = require('express');
const { db } = require('pg');

const app = express();
const port = 8080;

// FOR TESTING PURPOSES ONLY
// REMOVE LATER
// Users
// testing comment
const mockUsersData = [
    {
        email: 'jdoe67@scu.edu',
        password: '676767'
    },
    {
        email: 'peepeepoopoo@scu.edu',
        password: '12345'
    },
    {
        email: 'gymrat234@scu.edu',
        password: '00000000'
    },
    {
        email: 'sixsevennn@scu.edu',
        password: '666777'
    }
];

// Listings
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
        password: 676767
*/
app.post('/api/createuser', async (req, res) =>{
    const { email,  password} = req.body;
    // check if any required fields are missing
    if(!email || !password){
        console.log('[API] email or password is missing');
        // return 400 bad request if any of the fields are missing
        return res.status(400).json({
            error: 'Email or password is missing'
        });
    }

    try {
        /* a SQL query for inserting a new user into the 'users' table
        $1 and $2 are placeholders for the parameterized queries to prevent injection (SQL injection)
        $1 will replace the first value in the argument, and etc. */
        const query = `
            INSERT INTO users (email, password)
            VALUES ($1, $2) RETURNING *;
        `;

        // the array of values in order to substitute into the placeholders in the query
        const values = [email, password];
        //executing the query using the connection pool
        const newUser = (await pool.query(query, values)).rows[0];

        // Respond with 201 Created and return the newly created user
        res.status(201).json({ message: 'The user is created successfully', user: newUser });

    } catch (err) {
        //logging errors to the server console to debug anything
        console.error(err);
    // find if user email already exists
    // if so, stop account creation
    const validUser = mockUsersData.find(data => data.email === email);
    if(validUser){
        console.log('[API] User already exists. ');
         return res.status(401).json({
            error: 'User already exists in the system. Please login.'
        });
    }
    // add all of the fields to the db
    // FOR TESTING 
    const newUser = {
        email: email,
        password: password,
    };
    mockUsersData.push(newUser);
    console.log(`[API] Successfully created new user: ${newUser.name}`);
    res.status(201).json({
        message: 'User created successfully',
    });
});

// POST - Check if user credentials are valid
app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        console.log('[API] email or password is missing');
        return res.status(400).json({
            error: 'Email or password is missing'
        });
    }
    // FOR TESTING 
    // Since emails are unique, we're able to search for the singular valid user using only email and password
    const validUser = mockUsersData.find(data => data.email === email);
    if(!validUser){
        console.log('[API] User does not exist/entered invalid email');
         return res.status(401).json({
            error: 'Invalid user information. Please try again. If you don\'t have an account, please create an account'
        });
    }
    if (validUser.password !== password) { 
        console.log(`[API] Invalid password for user: ${email}`);
         return res.status(401).json({
            error: 'Invalid user information. Please try again. If you don\'t have an account, please create an account.'
        });
    }
    console.log(`[API] User successfuly found: ${validUser.email}`);
    res.status(201).json({
        message: 'User found successfully',
        email: validUser.email
    });
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
        description: description,
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

// GET/FETCH - Retrieve all listing data
app.get('/api/getlistings', (req, res) => {
    // get all listing data from db
    // loop to parse everything into an array

    // TEST FROM MOCK DB
    const listings = mockListingsData;
    console.log(`[API] Serving ${listings.length} listings.`);
    res.status(200).json(listings);
});

// GET/FETCH - Retrieve singular listing data
app.get('/api/getlistings/:id', (req, res) => {
    const id = req.params.id;
   if(!id){
        console.log('[API] Missing id');
        return res.status(400).json({
            error: 'Missing id'
        });
    }
    const foundListing = mockListingsData.find(mockListingsData => mockListingsData.id === id);
    if(!foundListing){
        console.log('[API] Listing not found/does not exist');
        return res.status(400).json({
            error: 'Listing does not exist'
        });
    }
   res.status(200).json(foundListing);
});

// DELETE - Delete specific listing
// Implement if needed. Otherwise disregard.
// Since professor is wondering what happens when a listing is sold
app.delete('api/deletelisting/:id', (req, res) => {
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
    return res.status(204).end();
});

// Simple verification route for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
