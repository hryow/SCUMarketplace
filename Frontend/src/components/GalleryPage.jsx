import React from 'react';
import styles from './GalleryPage.module.css';
import ListingCard from './ListingCard.jsx'

export default function GalleryPage() {
    return (
        <div className={styles.gridContainer}>
            <ListingCard />
            <ListingCard />
            <ListingCard />
        </div>
    );
}