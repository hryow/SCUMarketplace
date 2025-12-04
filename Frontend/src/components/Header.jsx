import React from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import logo from '../assets/scu-marketplace-full-logo.png';

export default function Header({ userEmail }){
    return(
        <div className={styles.container}>
            <Link to="/Gallery" className={styles.logo}>
                <img src={logo} alt="logo" className={styles.logoImage} />
            </Link>
            <div className={styles.welcome}>welcome, {userEmail}!</div>
            <Link to="/listing" className={styles.addListingButton}>
                <div className={styles.plus}>+</div>
                <div>sell something</div>
            </Link>
        </div>
    )
}