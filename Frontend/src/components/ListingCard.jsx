import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './ListingCard.module.css';

export default function ListingCard({ listingData, userEmail, onDelete }) { 
    const { id, photo, title, price, email } = listingData;
    const imageSource = `http://localhost:8080/images/${photo}`; 
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/listing/${id}`, { state: { listing: listingData } });
    };

    const handleMarkAsSold = async (e) => {
        e.stopPropagation(); 
        if (window.confirm("Mark this item as sold? This will remove the listing.")) {
            try {
                const response = await fetch(`/api/deletelisting/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete');
                }
                onDelete(id);

            } catch (error) {
                console.error("Error deleting:", error);
                alert("Failed to mark as sold.");
            }
        }
    };
    const isOwner = userEmail === email;

    return (
        <div className={styles.cardContainer} onClick={handleCardClick}>
            {isOwner && (
                <button className={styles.soldButton} onClick={handleMarkAsSold}>
                    Mark as Sold
                </button>
            )}
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