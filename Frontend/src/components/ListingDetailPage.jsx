import React, { useState, useEffect} from 'react';
import styles from './ListingDetailPage.module.css';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './Header.jsx'

export default function ListingDetailPage({userEmail}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.listing;
    const [listing, setListing] = useState(data || null);
    const [isEmailShown, setEmailShown] = useState(false);

    useEffect(() => {
        if (id) {
            async function fetchListingDetails() {
                try {
                    const response = await fetch(`/api/getlistings/${id}`); 
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    } 
                    const listingData = await response.json();
                    setListing(listingData); 

                } catch (error) {
                    console.error("Could not fetch listing details:", error);
                    setListing(null);
                }
            }
            // Only fetch if data wasn't passed via location.state (e.g., direct URL access)
            if (!data) { 
                fetchListingDetails();
            }
        }
    }, [id, data]); 

    function ContactClick() {
        window.location.href = `mailto:${listing.email}?subject=Interested in ${listing.title}`;
        setEmailShown(true);
    };

    async function deleteListing(listingId){
        console.log('Deleting listing from server...');
        try {
            const response = await fetch(`/api/deletelisting/${listingId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error. status: ${response.status}`);
            }
            
            // If deletion is successful, redirect to gallery
            navigate('/Gallery', { state: { listingDeleted: true } });

        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Failed to delete listing.');
        }
    }

    function handleDeleteClick(){
        if(window.confirm("Are you sure you want to delete this listing?")) {
            deleteListing(id);
        }
    }

    if (!listing) {
        return (
            <>
                <Header userEmail={userEmail}/>
                <div style={{ padding: '20px' }}> Loading Listing... </div>
            </>
        );
    }

    const imageUrl = `http://localhost:8080/images/${listing.photo}`;

    const isOwner = userEmail === listing.email;

    let contactSection;
    if (isOwner){
        contactSection = (
            <button onClick={handleDeleteClick} className={styles.buyButton}>
                Delete Listing
            </button>
        );
    } else {
        if (isEmailShown) {
            contactSection = <p className={styles.email}> An email has been drafted for you! Please contact the seller at: <b>{listing.email}</b> </p>;
        } else {
            contactSection = (
                <button onClick={ContactClick} className={styles.buyButton}>
                    Contact Seller
                </button>
            );
        }
    }

    return (
        <>
            <Header userEmail={userEmail}/>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%' }}
            >
                <div className={styles.pageContainer}>
                    <Link to="/Gallery" className = {styles.backButton}>
                    &lt; Back
                    </Link>
                    
                    <div className={styles.content}>

                        <div className={styles.image}>
                        <img src={imageUrl} alt={listing.title} className={styles.listingImage} />
                        </div>

                        <div className={styles.rightSide}>
                            <h1 className={styles.title}> {listing.title} </h1>

                            <div className={styles.listingInformation}>
                                <span className={styles.price}> ${listing.price} </span>
                                <span className={styles.location}> {listing.location} </span>
                            </div>
                            <p className= {styles.email}> Seller: {listing.email} </p>
                        
                            <p className={styles.lstingDesc}> {listing.description} </p>

                            {contactSection}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}