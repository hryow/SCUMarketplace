const express = require('express');
//Postgres connection
const pool = require('./db/connection');

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

// importing all routes
const routes = require('./routes/routes'); 

// using the routes
app.use('/api', routes); 

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
        // return 400 bad request if any of the fields are missing
        return res.status(400).json({
            error: 'Missing email or password'
        });
    }

    try {
        /* a SQL query for inserting a new user into the 'users' table
        $1 and $2 are placeholders for the parameterized queries to prevent injection (SQL injection)
        $1 will replace the first value in the argument, and etc. */
        const query = `
            INSERT INTO users (email, password)
            VALUES ($1, $2) 
            RETURNING *;
        `;

        // the array of values in order to substitute into the placeholders in the query
        const values = [email, password];
        //executing the query using the connection pool
        const newUser = (await pool.query(query, values)).rows[0];

        // Respond with 201 Created and return the newly created user
        res.status(201).json({ 
            message: 'User created successfully', 
            user: newUser 
        });

    } catch (err) {
        //logging errors to the server console to debug anything
        console.error(err);
        //checking for any unique constraint violation (i.e. if an email already exists)
        if (err.code === '23505') { // the PostgreSQL error code for unique violation
            return res.status(400).json({ error: 'User already exists' });
        } 
        // for any other error, we return the 500 Internal Server Error
        return res.status(500).json({ error: 'Database error creating the user' });
    }
});

/*        
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
*/

// POST - Check if user credentials are valid
app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    
    //validating the required fields
    if(!email || !password){
        console.log('[API] email or password is missing');
        return res.status(400).json({
            error: 'Email or password is missing'
        });
    }

     try {
        // A SQL query to find the user by email
        const query = 'SELECT * FROM users WHERE email = $1'; 
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ 
                error: 'User is not found!' 
            });
        }
        const user = result.rows[0];

        //we compare the password from the request with the stored password
        if (user.password !== password) {
            return res.status(401).json({ error: 'This is the incorrect password' });
        }
         
        //the login is successful
        res.status(200).json({ 
            message: 'The login is successful', 
            user
        });
         
    } catch (err) {
        console.error(err);
         // for any other error, we return the 500 Internal Server Error
        return res.status(500).json({ error: 'There was a database error during login' });
    }
});

/*
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

app.post('/api/createlisting', async (req, res) => {
    const { title, price, description, photo, location, email } = req.body;
    
    if(!title || !price || !description || !photo || !location || !email){
        console.log('[API] Title, price, description, photo, location, or email is missing');
        return res.status(400).json({
            error: 'Title, price, description, photo, location, or email is missing'
        });
    }

    try {
        const query = `
            INSERT INTO listings (title, price, description, photo, location, email)
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
        `;
        const values = [title, price, description, photo, location, email];

        //executing the query to insert a new listing
        const newListing = (await pool.query(query, values)).rows[0];

        //returning the newly created listing
        res.status(201).json({ 
            message: 'The listing is created successfully', 
            listing: newListing 
        });
    } catch (err) {
        console.error(err);
         // for any other error, we return the 500 Internal Server Error
        return res.status(500).json({ 
            error: 'There is a database error creating the listing' 
        });
    }
});

/*
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
*/
// GET/FETCH - Retrieve all listing data
    // get all listing data from db
    // loop to parse everything into an array
/*
    // TEST FROM MOCK DB
    const listings = mockListingsData;
    console.log(`[API] Serving ${listings.length} listings.`);
    res.status(200).json(listings);
});
*/

//Returns ALL listings
app.get('/api/getlistings', async (req, res) => {
    try {
        const query = 'SELECT * FROM listings ORDER BY id DESC';
        const listings = await pool.query(query);

        res.status(200).json(listings.rows);
    } catch (err) {
        console.error(err);
        // for any other error, we return the 500 Internal Server Error
        res.status(500).json({ error: 'There is a database error fetching listings' });
    }
});

// GET/FETCH - Retrieve singular listing data
app.get('/api/getlistings/:id', async (req, res) => {
// Need to get listing ID from the URL parameter
const id = parseInt(req.params.id);
    try {
        
        // Fetching all of the new listings sorted by newest
        const query = `SELECT * FROM listings WHERE id = $1`;
        const listings = await pool.query(query, [id]);

        if (listings.rows.length === 0) {
            return res.status(404).json({ 
                error: 'The listing is not found' 
            });
        }
        
        // Return the listing if it is found
        res.status(200).json(listings.rows[0]);
        
    } catch (err) {
        console.error(err);
         // for any other error, we return the 500 Internal Server Error
        res.status(500).json({ 
            error: 'There is a database error fetching the listings' 
        });
    }
});

/*
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
*/

// DELETE - Delete specific listing
// Implement if needed. Otherwise disregard.
// Since professor is wondering what happens when a listing is sold
app.delete('/api/deletelisting/:id', async (req, res) => {
    // Getting the listing ID from the URL parameter
    const id = parseInt(req.params.id);
    try {
        // Delete the listing and return the deleted row
        const query = 'DELETE FROM listings WHERE id = $1 RETURNING *'; 
        const listings = await pool.query(query, [id]);

        if (listings.rows.length === 0) {
            return res.status(404).json({ 
                error: 'The listing is not found' 
            });
        }
        
        res.status(200).json({ 
            message: 'The listing is deleted', 
            listing: listings.rows[0] 
        });
        
    } catch (err) {
        console.error(err);
        // for any other error, we return the 500 Internal Server Error
        res.status(500).json({ 
            error: 'There is a database error deleting the listing' 
        });
    }
});
/*
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
*/
// Simple verification route for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
