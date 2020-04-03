import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { signOut } from "../components/auth";

class Nav extends Component {
    render() {
        const navStyle = {
            color: 'white'
        }
        const userInfo = this.props.userInfo;
        return (
            <nav>
                <Link style={navStyle} to='/'>
                    <h3>Burger</h3>
                </Link>
                <ul className="navLinks">
                    <li>{`${userInfo.nom} ${userInfo.prenom}`}</li>
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
}

export default Nav;
