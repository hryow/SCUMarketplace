import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage({ setUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMode, setloginMode] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const switchAuthMode = () => {
        setloginMode(mode => !mode)
        setErrorMsg('');
    }

    async function createAccount(){
        try {
            const checkEmail = email.slice(-8);
            if(checkEmail != "@scu.edu"){
                setErrorMsg('Sign Up Failed. Please use an @scu.edu email account');
                return false;
            }
            const response = await fetch('/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password}),
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorMsg(`Sign up failed: ${data.error || 'Please retry.'}`)
                return false;
            }
            console.log('Account created successfully');
            return true; 
        } catch (error) {
            console.error('Sign up error:', error);
            setErrorMsg('An error occurred during sign up. Please try again');
            return false; 
        }
    }

    async function login(){
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorMsg(`Login failed: ${data.error || 'Please retry.'}`)
                return false; 
            }
            console.log('Login successful:', data); 
            return true; 

        } catch (error) {
            console.error('Login error:', error);
            setErrorMsg('An error occurred during login. Please try again.');
            return false; 
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(''); 
        try{
            let success = false;
            if (loginMode) { // Log In Mode
                success = await login();
                if (success) {
                    console.log('Login successful!');
                    setUserEmail(email);
                } else {
                    console.log('Login failed. Check the error message.');
                }
            } else { // Sign Up Mode
                success = await createAccount();
                if (success) {
                    console.log('Sign up successful!');
                    setloginMode(true); 
                    setErrorMsg('Account created successfully! Please log in with your new credentials.');
                    setEmail(''); 
                    setPassword('');
                } else {
                    console.log('Sign up failed. Check the error message.');
                }
            }
        } catch(error){
            console.log(`An unexpected error occurred: ${error.message}`);
            setErrorMsg('An unexpected error occurred. Please check your connection and try again.');
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
        >
            <div className={`${styles.card} ${!loginMode ? styles.signup : ''}`}>

                <div className={styles.content}>
                    <div className={styles.title}>
                        {loginMode ? 'Log In' : 'Sign Up'}
                    </div>

                    {/* Display error message */}
                    {errorMsg && (
                        <div className={styles.error} style={{ color: 'red', marginBottom: '10px' }}>
                            {errorMsg}
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            className={styles.field}
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@scu.edu"
                            required
                        >
                        </input>
                        
                        <input
                            className={styles.field}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required={!loginMode}
                        >
                        </input>

                        <div className={styles.newUser}>
                            {loginMode ? "First time using? " : "Already have an account? "}
                            
                            <span className={styles.link} onClick={switchAuthMode}>
                                {loginMode ? "Sign up for free" : "Log in here"}
                            </span>
                        </div>

                        <button type="submit">
                            {loginMode ? 'Log In' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}