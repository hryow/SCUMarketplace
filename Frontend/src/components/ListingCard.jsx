import React from 'react';
import { Link } from "react-router-dom";
import styles from './ListingCard.module.css';
import { useNavigate } from 'react-router-dom';


const amongUsNugget = "/amongNugget.jpg";

/* TODO: make title, price, be passed on thru props
         make more details go to listing*/

export default function ListingCard() {
    // fetch array of data, populate listing card fields with certain data
    // when onclick link, get key and fetch info to populate page w the array of data
    return (
        <div className={styles.cardContainer}
            onClick={handleCardClick}>
            <img src={listing.imageUrl}></img>
            <div className={styles.infoContainer}>
                <div className={styles.title}>{listing.title}</div>
                <div className={styles.priceDetails}>
                    <div className={styles.price}>$16</div>
                    <Link to="/listing/:id" className={styles.details}>more details &gt;</Link>
                </div>
            </div>
        </div>
    );
}