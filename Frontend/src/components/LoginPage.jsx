import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasAccount, setHasAccount] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const navigate = useNavigate();

    const switchAuthMode = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setHasAccount(mode => !mode)
            setEmail('');
            setPassword('');
            setIsAnimating(false);
        }, 300);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (hasAccount) {
            // Log in backend
        } else {
            // Sign up backend
        }
        navigate('/Gallery');
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.content} ${isAnimating ? styles.hidden : ''}`}>
                <div className={styles.title}>
                    {hasAccount ? 'Log In' : 'Sign Up'}
                </div>

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