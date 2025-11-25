import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [pfp, setPfp] = useState('');
    const [bio, setBio] = useState('');
    const [hasAccount, setHasAccount] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const switchAuthMode = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setHasAccount(mode => !mode)
            setEmail('');
            setPassword('');
            setName('');
            setPfp('');
            setBio('');
            setIsAnimating(false);
            setErrorMessage('');
        }, 300);
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
            if (hasAccount) {
                // Log in backend
                await login();
            } else {
                // Sign up backend
                await createAccount();
            }
            if (success) {
                console.log(`${hasAccount ? 'Login' : 'Sign up'} successful!`)
                setUserEmail(email);
                navigate('/Gallery');
            } else {
                console.log(`Failed to ${hasAccount ? 'log in' : 'sign up'}. Check the error message.`);
            }
        } catch(error){
            console.log(`Failed to ${hasAccount ? 'log in' : 'sign up'}. Please try again.`)
        }
        console.log("Email: " + email);
        setUserEmail(email);
        navigate('/Gallery');
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.content} ${isAnimating ? styles.hidden : ''}`}>
                <div className={styles.title}>
                    {hasAccount ? 'Log In' : 'Sign Up'}
                </div>

                {/* Display error message */}
                {errorMessage && (
                    <div className={styles.error} style={{ color: 'red', marginBottom: '10px' }}>
                        {errorMessage}
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
                        required
                    >
                    </input>
                    
                    {/* Additonal fields for sign-up mode */}
                    {!hasAccount && (
                        <>
                            <input
                                className={styles.field}
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                            <input
                                className={styles.field}
                                type="url"
                                id="pfp"
                                name="pfp"
                                value={pfp}
                                onChange={(e) => setPfp(e.target.value)}
                                placeholder="Profile Picture URL (Optional)"
                            />
                            <textarea
                                className={styles.field}
                                id="bio"
                                name="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Short Bio (Optional)"
                                rows="3"
                            />
                        </>
                    )}

                    <div className={styles.newUser}>
                        {hasAccount ? "First time using? " : "Already have an account? "}
                        
                        <span className={styles.link} onClick={switchAuthMode}>
                            {hasAccount ? "Sign up for free" : "Log in here"}
                        </span>
                    </div>

                    <button type="submit">
                        {hasAccount ? 'Log In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}