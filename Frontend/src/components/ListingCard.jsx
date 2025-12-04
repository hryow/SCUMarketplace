import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './ListingCard.module.css';

export default function ListingCard({ listingData }) { 
    const { id, photo, title, price } = listingData;
    const imageSource = `http://localhost:8080/images/${photo}`; 
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/listing/${id}`, { state: { listing: listingData } });
    };

    return (
        <div className={styles.cardContainer} onClick={handleCardClick}>
            <img src={imageSource} alt={title}></img> 
            <div className={styles.infoContainer}>
                <div className={styles.title}>{title}</div>
                <div className={styles.priceDetails}>
                    <div className={styles.price}>${price}</div>
                    <Link 
                        to={`/listing/${id}`} 
                        state={{ listing: listingData }}
                        className={styles.moreDetails} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        more details &gt;
                    </Link>
                </div>
            </div>
        </div>
    );
}