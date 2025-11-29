import React, {useState, useEffect} from 'react';
import styles from './ListingDetailPage.module.css';
import { Link, useParams, useLocation } from 'react-router-dom';

import Header from './Header.jsx'

//fake data for testing/styling
/*
        const mockData = {
            title: "Among Us Nugget",
            price: 67,
            location: "Swig Hall!",
            description: "Super rare nugget like an among us imposter from the imposter",
            email: "sellersemail@scu.edu",
            photo: "/amongNugget.jpg"  
        };
            setListing(mockData);
*/

export default function ListingDetailPage({userEmail}) {
    //id is whatever will be used to differentiate listings
    const { id } = useParams();

    // get listing data from ListingCard
    const location = useLocation();
    const data = location.state?.listing;
    const [listing, setListing] = useState(data || null);

    //checking to see if contact button was clicked to show email
    const [isEmailShown, setEmailShown] = useState(false);

    function ContactClick() {
        window.location.href = `mailto:${listing.email}?subject=Interested in ${listing.title}`;
        setEmailShown(true);
    };

    async function deleteListing(id){
        console.log('Deleting listing from server...');
        try {
            const response = await fetch(`/api/deletelisting/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error. status: ${response.status}`);
            }
            if (response.status === 204) {
                console.log('Success: Listing deleted (no content returned).');
                return;
            }
            const res = await response.json();
            console.log('Success:', res);
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    }

    function handleDeleteClick(){
        if(window.confirm("Are you sure you want to delete this listing?")) {
            console.log(`Deleting listing ${id}...`);
            //LOGIC TO ACTUALLY DELETE LISTING FETCH
            deleteListing(id);
        }
    }

    if (!listing) {
        return <div> Loading Listing... </div>;
    }

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
            contactSection = <p className={styles.email}> {listing.email} </p>;
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
            <div className={styles.pageContainer}>
                <Link to="/Gallery" className = {styles.backButton}>
                &lt; Back
                </Link>
                
                <div className={styles.content}>

                    <div className={styles.image}>
                    <img src={listing.photo} alt = {listing.title} className={styles.listingImage} />
                    </div>


                    <div className={styles.rightSide}>
                        <h1 className={styles.title}> {listing.title} </h1>

                        <div className={styles.listingInformation}>
                            <span className={styles.price}> ${listing.price} </span>
                            <span className={styles.location}> {listing.location} </span>
                        </div>
                    
                    <p className={styles.lstingDesc}> {listing.description} </p>

                    {contactSection}
                    
                    </div>


                </div>

            </div>
        </>
    );
}