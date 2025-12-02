import React, { useState, useEffect} from 'react';
import styles from './CreateListingPage.module.css';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';
// Have not added your email to the createlistingpage

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

async function submitListing(event){
    event.preventDefault();
    // Validate image upload
    if (!imageFile) {
        alert('Please upload an image for your listing');
        return;
    }

    console.log(`Adding listing to server`);

    console.log(listingName, price, description, location,imageFile);    

    const listingData = {
        title: listingName,
        price: price,
        description: description,
        photo: imageFile,
        location: location,
        email: 'peepeepoopoo@scu.edu' // dummy email for testing
    };
    
    try {
        const response = await fetch('/api/createlisting', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(listingData) 
        });
        if (!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}`);
        }
        const res = await response.json();
        console.log('Success:', res);
        navigate('/Gallery'); // Redirect to Gallery page 

    } catch (error) {
        console.error('Error submitting listing:', error);
    }

    //clear form after submission
    setListingName('');
    setPrice('');
    setLocation('');
    setDescription('');
    setImage(null);
    setImagePreview(null);

    setSubmitted(true);

    // setTimeout(() => setSubmitted(false), 3000);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file){
        setImage(file);
        setImagePreview(URL.createObjectURL(file));

        // Convert to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            // reader.result contains the Base64 string
            setImage(reader.result); // Store Base64 instead of file object
        };
        reader.readAsDataURL(file);
    }
}

let imageContent;
if (imagePreview) {
    imageContent = (
    <img src={imagePreview} alt='Listing Preview' className={styles.imagePreview} />
    );
} 
else{
    imageContent = (
        <>
            <div className = {styles.plusSign}> + </div>
            <div> Add Image </div>
        </>
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
            &lt; Back
            </Link>                
                

                <form className={styles.form} onSubmit={submitListing}>
                    <label className={styles.imageUploader}>
                        <input type="file" accept='image/*' className={styles.fileinput}
                        onChange={handleImageUpload}/>
                
                    {imageContent}
                    </label> 
                    <div className={styles.formInfo}>
                    <label> <b>Seller:</b>
                        <div>{userEmail}</div>
                    </label>
                    <label><b>Listing Name *</b>
                        <input type="text" className={styles.input} value={listingName} 
                        onChange={(e)=>setListingName(e.target.value)} required />
                    </label>

                    <div className={styles.priceAndLocation}>
                    <label className={styles.price}> <b>$ *</b>
                        <input type="number" className={styles.input} value={price} 
                        onChange={(e)=>setPrice(e.target.value)} required />
                    </label>
                    <label className={styles.location}> <b>Location *</b>
                        <input type="text" className={styles.input} value={location} 
                        onChange={(e)=>setLocation(e.target.value)} required />
                    </label>
                        </div> 

                    <label><b>Description *</b>
                        <textarea className={styles.textArea} value={description}
                        onChange={(e)=>setDescription(e.target.value)} required />
                    </label>

                    <button type="submit" className={styles.submitButton}> 
                        Submit Listing
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