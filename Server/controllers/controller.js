// Importing the PostgreSQL connection from db folder to run the queries
const pool = require('../db/connection');
const fs = require('fs'); 
const path = require('path');

// Creating a new user
exports.createUser = async (req, res) => {
  // Extracting the user data from the request body
  const { email, password } = req.body;

  // Validating the required fields
  if (!email || !password) {
    // Return a 400 Bad Request if any of the fields are missing
    return res.status(400).json({ 
      error: 'Email or password is missing and not there' 
    });
  }

  // SCU email validation
  if (!email.endsWith("@scu.edu")) {
    return res.status(400).json({ error: 'Only SCU emails allowed' });
  }

  try {
    // a SQL query to insert a new user into the 'users' table
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [email, password];

    // Executing the query and getting the inserted user
    const newUser = (await pool.query(query, values)).rows[0];

    // Logging the success to server console
    console.log(`[API] Successfully created new user: ${newUser.email}`);

    // Sending the success response with the user data
    res.status(201).json({
      message: 'The user is created successfully',
      email: newUser.email
    });
    
  } catch (err) {
    // Logging the error and returning a 500 Internal Server Error if database query fails
    console.error(err);
    
    //constraint 
    if (err.code === '23505') { 
      return res.status(400).json({ 
        error: 'The user already exists' 
      });
    }
    res.status(500).json({ error: 'Database error creating user' });
  }
};

// The user login
exports.login = async (req, res) => {
  // Extracting login credentials from request body
  const { email, password } = req.body;

  // Validating the presence of email and password
  if (!email || !password) return res.status(400).json({ error: 'The email or password is missing.' });

  // SCU email validation
  if (!email.endsWith("@scu.edu")) {
    return res.status(400).json({ error: 'Only SCU emails allowed' });
  }
  
  try {
    // A query to find user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // If the user not found, return 401 Unauthorized
    if (result.rows.length === 0) {
      //console.log('[API] The user does not exist/invalid email');
      return res.status(401).json({ error: 'Invalid user info. Create an account please.' });
    }

    // Getting the user from the query result
    const validUser = result.rows[0];

    // Checking the password
    if (validUser.password !== password) {
      //console.log(`[API] Invalid password for user: ${email}`);
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Logging the successful login
    console.log(`[API] User successfully found: ${validUser.email}`);

    // Sending a success response with user info
    res.status(200).json({
      message: 'User found successfully',
      email: validUser.email,
    });
  } catch (err) {
    // Logging the error and return 500 if the query fails
    console.error(err);
    res.status(500).json({ error: 'Database error during login' });
  }
};


// Create the new listing
exports.createListing = async (req, res) => {
  const { title, price, description, location, email } = req.body;
  const imagePath = req.file ? req.file.filename : null; 

  // Validating the required fields (including the file)
  if (!title || !price || !description || !location || !email || !imagePath) {
    return res.status(400).json({ error: 'Missing required field or image file.' });
  }

  try {
    // A SQL query to insert a new listing
    const query = `INSERT INTO listings (title, price, description, photo, location, email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    const values = [title, price, description, imagePath, location, email];

    // Executing the query and get the new listing
    const newListing = (await pool.query(query, values)).rows[0];

    // Logging the success
    console.log(`[API] Successfully created new listing: ${newListing.title}`);

    // Returning the new listing in the response
    res.status(201).json({
      message: 'Listing created successfully',
      id: newListing.id,
      title: newListing.title,
      price: newListing.price,
      description: newListing.description,
      photo: imagePath,
      location: newListing.location,
      email: newListing.email
    });
  } catch (err) {
    // Logging the error and return 500 if the query fails
    console.error(err);
    res.status(500).json({ error: 'Database error creating listing' });
  }
};

// Getting all of the listings
exports.getListings = async (req, res) => {
  try {
    // Query to get all listings ordered by newest first
    const listings = (await pool.query('SELECT * FROM listings ORDER BY id DESC')).rows;

    // Logging the number of listings being served
    console.log(`[API] Serving ${listings.length} listings.`);

    // Returning the listings as JSON
    res.status(200).json(listings);
  } catch (err) {
    // Logging the error and return 500 if query fails
    console.error(err);
    res.status(500).json({ error: 'Database error fetching listings' });
  }
};

// Get singular listing for viewing
exports.getSingleListing = async (req, res) => {
  // Get the id from the URL parameters
  const { id } = req.params; 
  
  try {
    // Query to get the listing with a matching id
    const result = await pool.query('SELECT * FROM listings WHERE id = $1', [id]);
    const listing = result.rows[0];

    if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
    }
    console.log(`[API] Serving listing ID: ${id}.`);
    res.status(200).json(listing);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error fetching listing' });
  }
};

const getImagePath = (filename) => {
    return path.join(__dirname, '..', 'imgs', filename); 
};

// Delete listing
exports.deleteListing = async (req, res) => {
  const { id } = req.params; 
  try {
    // Retrieve listing
    const selectQuery = 'SELECT photo FROM listings WHERE id = $1';
    const selectResult = await pool.query(selectQuery, [id]);
    if (selectResult.rowCount === 0) {
        return res.status(404).json({ error: 'Listing not found or already deleted' });
    }
    const filename = selectResult.rows[0].photo;
    // Delete from db
    const deleteQuery = 'DELETE FROM listings WHERE id = $1';
    await pool.query(deleteQuery, [id]); 

    // Remove file from local storage on server
    if (filename) {
        const fullPath = getImagePath(filename);
        try {
            fs.unlinkSync(fullPath);
            console.log(`[File System] Successfully deleted file: ${filename}`);
        } catch (fileError) {
            console.error(`[File System Error] Could not delete file ${filename}:`, fileError.message);
        }
    }
    console.log(`[API] Successfully deleted listing ID: ${id}.`);
    res.status(200).json({ message: 'Listing successfully deleted', deletedListingId: id });

  } catch (dbError) {
    console.error(dbError);
    res.status(500).json({ error: 'Database error during deletion' });
  }
};
