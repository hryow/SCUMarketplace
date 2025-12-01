import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage({ setUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [pfp, setPfp] = useState('');
    const [bio, setBio] = useState('');
    const [loginMode, setloginMode] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const switchAuthMode = () => {
        setloginMode(mode => !mode)
        setErrorMsg('');
    }

    async function createAccount(){
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, pfp, bio }),
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorMsg(`Sign up failed: ${data.message || 'Please retry.'}`)
                return;
            }
            console.log('Account created successfully');
            return; 
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
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
                setErrorMsg(`Login failed: ${data.message || 'Please retry.'}`)
                return;
            }
            console.log('Login successful:', data); 
            return data;

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let success = false;
            if (loginMode) {
                // CHECK IF USER HAS AN ACCOUNT
                // IF ACCOUNT DOESN'T EXIST, ASK TO SIGNUP
                await login();
            } else { // signupMode
                // CHECK IF USER HAS AN ACCOUNT
                // IF ACCOUNT ALREADY EXISTS, ASK TO LOGIN
                await createAccount();
            }
            if (success) {
                console.log(`${loginMode ? 'Login' : 'Sign up'} successful!`)
                setUserEmail(email);
                navigate('/Gallery');
            } else {
                console.log(`Failed to ${loginMode ? 'log in' : 'sign up'}. Check the error message.`);
            }
        } catch(error){
            console.log(`Failed to ${loginMode ? 'log in' : 'sign up'}. Please try again.`)
        }
        console.log("Email: " + email);
        setUserEmail(email);
        navigate('/Gallery');
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
                    
                    {/* Additonal fields for sign-up mode */}
                    <div className={`${styles.expandableFields} ${!loginMode ? styles.show : ''}`}>
                        <input
                            className={styles.field}
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                            required={!loginMode}
                        />
                        <input
                            className={styles.field}
                            type="url"
                            id="pfp"
                            name="pfp"
                            value={pfp}
                            onChange={(e) => setPfp(e.target.value)}
                            placeholder="profile picture URL (optional)"
                        />
                        <textarea
                            className={styles.field}
                            id="bio"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="short bio (optional)"
                            rows="3"
                        />
                    </div>

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