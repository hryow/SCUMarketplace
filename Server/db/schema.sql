/* SCUMarketplace MVP Database Schema
   Tables:
   - Users
   - Listings
   - Messages (buyer → seller)
   - Transactions (mark sold & remove listing) */

/* Users Table
   - Users sign up with SCU email only
   - If a specific user doesn't have SCU email, they cannot use the platform
   - User info stored minimally
*/

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email LIKE '%@scu.edu'),
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    pfp TEXT NOT NULL,
    bio TEXT NOT NULL
);


/* Listings Table
   - Gallery of items ordered by most recent
   - Title, cost, description, photos, location shown
   - Sellers can create listings
   - Sellers can mark the item as sold
*/

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT NOT NULL,
    photo TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    is_sold BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

/* Transactions Table
   Records a completed sale.
   - One transaction per listing (A unique constraint)
   - Automatically marks listing as sold (trigger)
*/
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,                                 
    listing_id INTEGER UNIQUE NOT NULL
        REFERENCES listings(id),                           
    buyer_email VARCHAR(255) NOT NULL
        REFERENCES users(email),                           
    seller_email VARCHAR(255) NOT NULL
        REFERENCES users(email),                           
    sold_at TIMESTAMP DEFAULT NOW()                        
);

/* Trigger
   When a transaction is created:
   - Automatically update listings.is_sold = TRUE
   - Fulfills the MVP "mark as sold" requirement
*/
CREATE OR REPLACE FUNCTION mark_listing_sold()
RETURNS TRIGGER AS $$
BEGIN
    /* When a row is inserted into transactions, we will immediately mark the associated listing as sold. */
    UPDATE listings
    SET is_sold = TRUE
    WHERE id = NEW.listing_id;
    RETURN NEW; 
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_mark_sold
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION mark_listing_sold();
