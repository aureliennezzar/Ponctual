import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { signOut } from "../scripts/auth";
import { storageRef } from "../scripts/services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


const Nav = props => {
    const [state, setState] = useState({
        imageComponent: <FontAwesomeIcon icon={faUserCircle} size="4x" />,
        loading: true
    })
    const {loading, imageComponent} = state;
    const setImage = uid => {
        const profilePictureRef = storageRef.child(`${uid}/profile_64x64.jpg`);
        profilePictureRef.getDownloadURL().then((url) => {
            setState({ imageComponent: <img src={url} style={{ borderRadius: '50%', cursor: "pointer" }} alt={url} />, loading: false })
        }).catch(function (error) {
        });
    }
    const navStyle = {
        color: 'white'
    }
    const { nom, prenom, email, profilepic } = props.userInfo;
    if (profilepic && loading) setImage(email);
    return (
        <nav>
            <h3>Burger</h3>
            <ul className="navLinks">
                <li>{`${nom} ${prenom}`}</li>

                {imageComponent}

                <Link style={navStyle} to='/' onClick={signOut}>
                    <li>Se déconnecter</li>
                </Link>
            </ul>
        </nav>
    )
}


export default Nav;
