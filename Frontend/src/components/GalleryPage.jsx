import React from 'react';
import styles from './GalleryPage.module.css';
import ListingCard from './ListingCard.jsx'

import Header from './Header.jsx'


export default function GalleryPage() {
    const [listings, setListings] = useState([]);
    
    // // fetching data from backend when component mounts
    // useEffect(() => {
    //     const fetchListings = async() => {
    //         try{
    //             const response = await fetch('/api/getlistings');
    //             const data = await response.json();
    //             // sort in descending order (newest listings first)
    //             const sortedData = data.sort((a, b) => b.id - a.id);
    //             setListings(sortedData);
    //         }catch (error){
    //             console.error('Error fetching listings: ', error);
    //         }
    //     };
    //     fetchListings();
    // }, []); // runs once on load

    return (
        <>
            <Header />
            <div className={styles.gridContainer}>
                {listings.map((listing) => (
                    <ListingCard 
                        listingData = {listing}
                    />
                ))}
            </div>
        </>
    );
}