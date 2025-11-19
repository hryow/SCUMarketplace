import React, { useState, useEffect} from 'react';
import styles from './CreateListingPage.module.css';
import {Link, useParams} from 'react-router-dom';
//Have not added your email to the createlistingpage

export default function CreateListingPage() {
const [listingName, setListingName] = useState('');
const [price, setPrice] = useState('');
const [location, setLocation] = useState('');
const [description, setDescription] = useState('');
const [imageFile, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

const[isSubmitted, setSubmitted] = useState(false);

async function submitListing(event){
    event.preventDefault();
    console.log(`Adding listing to server`)

    console.log(listingName, price, location, description,imageFile);    

    
    const formData = new FormData();
    formData.append('listingName',listingName);
    formData.append('price',price);
    formData.append('location',location);
    formData.append('description',description);
    formData.append('image',imageFile);

    //clear form after submission
    setListingName('');
    setPrice('');
    setLocation('');
    setDescription('');
    setImage(null);
    setImagePreview(null);

    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file){
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
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
        <div className={styles.pageContainer}> 
        <Link to="/Gallery" className={styles.backButton}>
        &lt; Back
        </Link>                
            

            <form className={styles.form} onSubmit={submitListing}>
                <label className={styles.imageUploader}>
                     <input type="file" accept='image/*' className={styles.fileinput}
                     onChange={handleImageUpload} />
            
                {imageContent}
                </label>
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
                {isSubmitted && (
                    <p style={{color: 'green', marginTop: '10px'}}>
                        Successfully Submitted!</p>
                )}
                </div>
            </form>
        </div>
    );
}