import React from "react";
import styles from './Popup.module.css';
import { motion } from 'framer-motion';

export default function Popup({ message, onClose }){
    return(
        <motion.div 
            className={styles.container}
            onClick={onClose}            
            initial={{ opacity: 0, y: -20, x: "-50%" }} 
            animate={{ opacity: 1, y: 0, x: "-50%" }} 
            exit={{ opacity: 0, y: -20, x: "-50%" }} 
            transition={{ duration: 0.5 }}
        >
            <div className={styles.text}>
                {message}
            </div>
        </motion.div>
    )
}