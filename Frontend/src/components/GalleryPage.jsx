import React, { useState, useEffect, useRef } from 'react';
import styles from './GalleryPage.module.css';
import ListingCard from './ListingCard.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import Header from './Header.jsx';
import Popup from './Popup';

export default function GalleryPage({ userEmail }) {
    const [listings, setListings] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const location = useLocation();
    const hasShownPopup = useRef(false);

    // check if listing was created/deleted
    useEffect(() => {
        if (!hasShownPopup.current) {
            // listing created
            if (location.state?.listingCreated) {
                setPopupMessage("Your listing was created!");
                setShowPopup(true);
                hasShownPopup.current = true;
                window.history.replaceState({}, document.title);
            }
            else if (location.state?.listingDeleted) {
                setPopupMessage("Your listing was deleted.");
                setShowPopup(true);
                hasShownPopup.current = true;
                window.history.replaceState({}, document.title);
            }
        }
    }, [location]);

    // make popup go away after 4 seconds
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);
    
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
            <AnimatePresence>
                {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
            </AnimatePresence>
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