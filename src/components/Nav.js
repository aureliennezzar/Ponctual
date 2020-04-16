import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { signOut } from "../scripts/auth";
import { auth } from "../scripts/services/firebase";
import { storageRef } from "../scripts/services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './Nav.css'

const Nav = props => {
    const [state, setState] = useState({
        imageComponent: <FontAwesomeIcon icon={faUserCircle} size="2x" />,
        loading: true
    })
    const [displayName, setDisplayName] = useState('Loading...')
    const { loading, imageComponent } = state;
    const { profilepic } = props.userInfo;


    useEffect(() => {
        const user = auth().currentUser;
        if (user && loading) {
            setUser(user)
        } else { setDisplayName("Loading...") }
    }, []);

    const setUser = user => {
        const {displayName } = user;
        if (profilepic.length > 0) {
            const profilePictureRef = storageRef.child(`${profilepic}/profile_31x31.jpg`);
            profilePictureRef.getDownloadURL().then((url) => {
                
                setState({ ...state, imageComponent: <img src={url} style={{ borderRadius: '50%', cursor: "pointer" }} alt={url} /> })
            }).catch(function (error) {
            });
        }
        setDisplayName(displayName);
        setState({ ...state, loading: false });
    }



    const navStyle = {
        color: 'white'
    };
    return (
        <nav>
            <h3>Burger</h3>
            <ul className="navLinks">
                <li>{`${displayName}`}</li>
                <div className="imageComponent">
                    {imageComponent}
                </div>

                <Link style={navStyle} to='/' onClick={signOut}>
                    <li>Se déconnecter</li>
                </Link>
            </ul>
        </nav>
    )
}


export default Nav;
