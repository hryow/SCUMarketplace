import React, { useState, useEffect} from 'react';
import styles from './CreateListingPage.module.css';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './Header.jsx'

export default function CreateListingPage({ userEmail }) {
const navigate = useNavigate(); // Initialize the hook
const [listingName, setListingName] = useState('');
const [price, setPrice] = useState('');
const [location, setLocation] = useState('');
const [description, setDescription] = useState('');
const [imageFile, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

const[isSubmitted, setSubmitted] = useState(false);

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // For preview
    }
};

async function submitListing(event){
    event.preventDefault();
    if (!imageFile) {
        alert('Please upload an image for your listing');
        return;
    }

    console.log(`Adding listing to server`);
    const formData = new FormData();
    
    formData.append('title', listingName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('photo', imageFile); 
    formData.append('location', location);
    formData.append('email', userEmail);

    try {
        const response = await fetch('/api/createlisting', { 
            method: 'POST',
            body: formData 
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}`);
        }
        
        const res = await response.json();
        console.log('Success:', res);
        navigate('/Gallery', { state: { listingCreated: true } });
        
    } catch (error) {
        console.error('Error submitting listing:', error);
    }

    // Clear after submitting
    setListingName('');
    setPrice('');
    setLocation('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setSubmitted(true);
}

let imageContent;
if (imagePreview) {
    imageContent = (
    <img src={imagePreview} alt='Listing Preview' className={styles.imagePreview} />
    );
} 
else{
    imageContent = (
        <div className={styles.addImageText}>
            <div className = {styles.plusSign}> + </div>
            <div> add image</div>
        </div>
    );
}

return (
    <>
        <Header userEmail={userEmail} />
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
        >
            <div className={styles.pageContainer}> 
            <Link to="/Gallery" className={styles.backButton}>
                &lt; back
            </Link>                
                

                <form className={styles.form} onSubmit={submitListing}>
                    <label className={styles.imageUploader}>
                        <input type="file" accept='image/*' className={styles.fileinput}
                        onChange={handleImageUpload}/>
                
                        {imageContent}
                    </label> 
                    <div className={styles.formInfo}>
                    <label> <b>seller:</b>
                        <div>{userEmail}</div>
                    </label>
                    <label><b>listing name *</b>
                        <input type="text" className={styles.input} value={listingName} 
                        onChange={(e)=>setListingName(e.target.value)} required />
                    </label>

                    <div className={styles.priceAndLocation}>
                    <label className={styles.price}> <b>$ *</b>
                        <input type="number" className={styles.input} value={price} 
                        onChange={(e)=>setPrice(e.target.value)} required />
                    </label>
                    <label className={styles.location}> <b>location *</b>
                        <input type="text" className={styles.input} value={location} 
                        onChange={(e)=>setLocation(e.target.value)} required />
                    </label>
                        </div> 

                    <label><b>description *</b>
                        <textarea className={styles.textArea} value={description}
                        onChange={(e)=>setDescription(e.target.value)} 
                        placeholder='condition, reason for selling, pickup logistics, etc.'
                        required />
                    </label>

                    <button type="submit" className={styles.submitButton}> 
                        submit listing
                    </button>
                    {/* {isSubmitted && (
                        <p style={{color: 'green', marginTop: '10px'}}>
                            Successfully Submitted!</p>
                    )} */}
                    </div>
                </form>
            </div>
        </motion.div>
    </>
    );
}