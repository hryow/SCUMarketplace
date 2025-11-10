import React from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';

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
        // <header className="siteHeader">
        //     <nav>
        //         <ul>
        //             <li><Link to="/profile">profile</Link></li>
        //             <li><Link to="/Gallery">Gallery</Link></li>
        //             <li><Link to="/Listing">Create Listing</Link></li>
        //         </ul>
        //     </nav>

        // </header>
    )
}