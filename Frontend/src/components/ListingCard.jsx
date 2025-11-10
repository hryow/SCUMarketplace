import React from 'react';
import styles from './ListingCard.module.css';

export default function ListingCard() {
    return (
        <div className={styles.cardContainer}>
            <img></img>
            <div className={styles.infoContainer}>
                <div>Cute Labubu</div>
                <div>$16</div>
            </div>
            <div className={styles.details}>more details &gt;</div>
        </div>
    );
}