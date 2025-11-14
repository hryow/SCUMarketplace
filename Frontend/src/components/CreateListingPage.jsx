import React, { useState, useEffect} from 'react';
import styles from './CreateListingPage.module.css';
import {Link, useParams} from 'react-router-dom';
//Have not added your email to the createlistingpage

export default function CreateListingPage() {
const [listingName, setListingName] = useState('');
const [price, setPrice] = useState('');
const [location, setLocation] = useState('');
const [description, setDescription] = useState('');
//images need to be added still

function submitListing(event){
    event.preventDefault();
    console.log(`Adding listing to server`)

    console.log(listingName, price, location, description);    
    //send to server or something here
}

return (
        <div className={styles.pageContainer}> 
        <Link to="/Gallery" className={styles.backButton}>
        &lt; Back
        </Link>                
            
            <form className={styles.form} onSubmit={submitListing}>
                <div className={styles.imageUploader}>
                    <div className={styles.plusSign}> + </div>
                    <div> Add Image </div>
                    {/*Will add image stuff here later */}
                </div>

                <div className={styles.formInfo}>
                <label>Listing Name *
                    <input type="text" className={styles.input} value={listingName} 
                    onChange={(e)=>setListingName(e.target.value)} required />
                </label>

                <div className={styles.priceAndLocation}>
                <label className={styles.price}> $ *
                    <input type="number" className={styles.input} value={price} 
                    onChange={(e)=>setPrice(e.target.value)} required />
                </label>
                <label className={styles.location}> Location
                    <input type="text" className={styles.input} value={location} 
                    onChange={(e)=>setLocation(e.target.value)} required />
                </label>
                    </div> 

                <label>Description
                    <textarea className={styles.textArea} value={description}
                    onChange={(e)=>setDescription(e.target.value)} required />
                </label>

                <button type="submit" className={styles.submitButton}> 
                Submit Listing
                
                </button>
                </div>
            </form>
        </div>
    );
}