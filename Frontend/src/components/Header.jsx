import React from "react";
import { Link } from "react-router-dom";
import './header.css';

function Header(){
    return(
        <header className="siteHeader">
            <nav>
                <ul>
                    <li><Link to="/profile">profile</Link></li>
                    <li><Link to="/Gallery">Gallery</Link></li>
                    <li><Link to="/Listing">Create Listing</Link></li>
                </ul>
            </nav>

        </header>
    )
}
export default Header;