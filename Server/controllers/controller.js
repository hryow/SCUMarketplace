// Importing the PostgreSQL connection from db folder to run the queries
const pool = require('../db/connection');

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
    console.log(`[API] Successfully created new user: ${newUser.name}`);

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

  try {
    // A query to find user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // If the user not found, return 401 Unauthorized
    if (result.rows.length === 0) {
      console.log('[API] The user does not exist/invalid email');
      return res.status(401).json({ error: 'Invalid user info. Create an account please.' });
    }

    // Getting the user from the query result
    const validUser = result.rows[0];

    // Checking the password
    if (validUser.password !== password) {
      console.log(`[API] Invalid password for user: ${email}`);
      return res.status(401).json({ error: 'Invalid user info. Please create an account.' });
    }

    // Logging the successful login
    console.log(`[API] User successfully found: ${validUser.email}`);

    // Sending a success response with user info
    res.status(201).json({
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
  // Extract listing data from request body
  const { title, price, description, photo, location, email } = req.body;

  // Validating the required fields
  if (!title || !price || !description || !photo || !location || !email) {
    return res.status(400).json({ error: 'Title, price, description, photo, location, or email is missing' });
  }

  try {
    // A SQL query to insert a new listing
    const query = `INSERT INTO listings (title, price, description, photo, location, email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    const values = [title, price, description, photo, location, email];

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
      photo: newListing.photo,
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
