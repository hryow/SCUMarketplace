import React, {useState, useEffect} from 'react';
import styles from './ListingDetailPage.module.css';
import { Link, useParams } from 'react-router-dom';



export default function ListingDetailPage() {

    //id is whatever will be used to differntiate listings
    const {id} = useParams();

    const [listing,setListing] = useState(null);

    //checking to see if contact button was clicked to show email
    const [isEmailShown, setEmailShown] = useState(false);

    useEffect(() => {
        function getListingData(){
            console.log(`Getting listing data for id: ${id}`);

            fetch(`/api/getlisting/${id}`)
                .then(response => response.json())
                .then(data => {
                    setListing(data);
                })
                .catch(error => {
                    console.error("Error getting listing data:", error);
                });
        
 
                
//fake data for testing/styling
/*
        const mockData = {
            title: "Among Us Nugget",
            price: 67,
            location: "Swig Hall!",
            description: "Super rare nugget like an among us imposter from the imposter",
            email: "sellersemail@scu.edu",
            imageUrl: "/amongNugget.jpg"  
        };
            setListing(mockData);
*/
    }
        getListingData(); },[id]);
        
        function ContactClick(){
        setEmailShown(true);
    };

    if (!listing) {
        return <div> Loading Listing </div>;
    }

    let contactSection;
    if(isEmailShown) {
        contactSection = (
            <p className ={styles.email}> {listing.email} </p>
        );
    }else {
        contactSection = (
            <button onClick={ContactClick} className={styles.buyButton}>
                Contact!
            </button>     
        );
    }
    
    

    return (
        <div className={styles.pageContainer}>
            <Link to="/Gallery" className = {styles.backButton}>
            &lt; Back
            </Link>
            
            <div className={styles.content}>

                <div className={styles.image}>
                <img src={listing.imageUrl} alt = {listing.title} className={styles.listingImage} />
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
    );
}