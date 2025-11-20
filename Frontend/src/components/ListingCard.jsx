import React from 'react';
import styles from './ListingCard.module.css';

const amongUsNugget = "/amongNugget.jpg";

/* TODO: make title, price, be passed on thru props
         make more details go to listing*/

export default function ListingCard({ listing }) {
    const navigate = useNavigate();
    // when the user clicks the card
    const handleCardClick = () =>{
       navigate(`/listing/${listing.id}`, {
            state: {listing: listing}
       });
    }

    return (
        <div className={styles.cardContainer}
            onClick={handleCardClick}>
            <img src={listing.photo}></img>
            <div className={styles.infoContainer}>
                <div className={styles.title}>{listing.title}</div>
                <div className={styles.priceDetails}>
                    <div className={styles.price}>{listing.price}</div>
                    <div className={styles.details}>more details &gt;</div>
                </div>
            </div>
        </div>
    );
}