import React from 'react';
import styles from './ListingCard.module.css';

const amongUsNugget = "/amongNugget.jpg";

export default function ListingCard() {
    return (
        <div className={styles.cardContainer}>
            <img src={amongUsNugget}></img>
            <div className={styles.infoContainer}>
                <div className={styles.title}>Among Us Nugget</div>
                <div className={styles.priceDetails}>
                    <div className={styles.price}>$16</div>
                    <div className={styles.details}>more details &gt;</div>
                </div>
            </div>
        </div>
    );
}