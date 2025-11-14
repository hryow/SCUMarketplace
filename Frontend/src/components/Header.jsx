import React from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';

/* TODO: make button pressable (goes down on click)
         make "User" depend on name
         make pfp depend on pfp */

export default function Header(){
    return(
        <div className={styles.container}>
            <div className={styles.profile}></div>
            <div className={styles.welcome}>Welcome, User! </div>
            <div className={styles.addListingButton}>
                <div className={styles.plus}>+</div>
                <div>sell something</div>
            </div>
        </div>
    )
}