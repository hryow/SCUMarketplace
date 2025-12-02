import React, { useState, useEffect } from 'react';
import styles from './GalleryPage.module.css';
import ListingCard from './ListingCard.jsx';
import { motion } from 'framer-motion';

import Header from './Header.jsx';

export default function GalleryPage({ userEmail }) {
    const [listings, setListings] = useState([]);
    
    useEffect(() => {
        const fetchListings = async() => {
            try{
                const response = await fetch('/api/getlistings');
                const data = await response.json();
                // sort in descending order (newest listings first)
                const sortedData = data.sort((a, b) => b.id - a.id);
                setListings(sortedData);
            } catch (error){
                console.error('Error fetching listings: ', error);
            }
        };
        fetchListings();
    }, []); // runs once on load

    return (
        <>
            <Header userEmail={userEmail}/>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.gridContainer}>
                    {listings.map((listing) => (
                        <ListingCard 
                            key={listing.id}
                            listingData = {listing}
                        />
                    ))}
                </div>
            </motion.div>
        </>
    );
}