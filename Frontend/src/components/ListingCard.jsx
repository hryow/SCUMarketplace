import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './ListingCard.module.css';

export default function ListingCard({ listingData }) { 
    const { id, imageUrl, title, price } = listingData;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/listing/${id}`);
    };

    return (
        <div className={styles.cardContainer} onClick={handleCardClick}>
            <img src={imageUrl || '/default-image.jpg'} alt={title}></img> 
            <div className={styles.infoContainer}>
                <div className={styles.title}>{title}</div>
                <div className={styles.priceDetails}>
                    <div className={styles.price}>${price}</div>
                    <Link to={`/listing/${id}`} className={styles.details} onClick={(e) => e.stopPropagation()}>
                        more details &gt;
                    </Link>
                </div>
            </div>
        </div>
    );
}