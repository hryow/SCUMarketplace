import React, {useState} from 'react';
import styles from './ListingDetailPage.module.css';
import { Link } from 'react-router-dom';

const amongUsNugget = "/amongNugget.jpg";


//Everything is hardcoded currently to get the styling and page looking correct
export default function ListingDetailPage() {
    function BuyNow(){
        console.log('Item Bought/Requested');
        //Backend Connection
        //
    };
    
    return (
        <div>
            <Link to="/GalleryPage" className = {styles.backButton}>
            &lt; Back
            </Link>
            
            <div className={styles.content}>

                <div className={styles.image}>
                <img src={amongUsNugget} alt = "Among Us Nugget" className={styles.listingImage} />
                </div>


                <div className={styles.rightSide}>
                    <h1 className={styles.title}> Among Us Nugget </h1>

                    <div className={styles.listingInformation}>
                        <span className={styles.price}> $67 </span>
                        <span className={styles.location}> Swig Hall!</span>
                    </div>
                
                <p className={styles.lstingDesc}> Super rare nugget like an among us imposter from the imposter </p>

                <button onClick={BuyNow} className={styles.buyButton}>
                    Buy!!!!
                </button>

                <p className={styles.email}> sellersemail@scu.edu </p>

                </div>


            </div>

        </div>
    );
}