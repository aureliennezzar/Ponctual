import React from 'react';
import { Link } from 'react-router-dom'
import { signOut } from "../components/auth";

function Nav() {
    const navStyle = {
        color: 'white'
    }
    return (
        <nav>
            <Link style={navStyle} to='/'>
                <h3>Burger</h3>
            </Link>
            <ul className="navLinks">
                <li>Nom Prénom</li>
                <Link style={navStyle} to='/disconnect'>
                    <li>Image</li>
                </Link>
                <Link style={navStyle} to='/' onClick={signOut}>
                    <li>Se déconnecter</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;
