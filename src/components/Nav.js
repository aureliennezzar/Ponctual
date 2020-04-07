import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { signOut } from "../scripts/auth";
import { auth } from "../scripts/services/firebase";
import { storageRef } from "../scripts/services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


const Nav = props => {
    const [state, setState] = useState({
        imageComponent: <FontAwesomeIcon icon={faUserCircle} size="4x" />,
        loading: true,
        uid: null,
        displayName: null
    })
    const { loading, imageComponent, uid, displayName } = state;
    const user = auth().currentUser;

    const setImage = uid => {
        const profilePictureRef = storageRef.child(`${uid}/profile_64x64.jpg`);
        profilePictureRef.getDownloadURL().then((url) => {
            setState({ imageComponent: <img src={url} style={{ borderRadius: '50%', cursor: "pointer" }} alt={url} />, loading: false })
        }).catch(function (error) {
        });
    }
    const navStyle = {
        color: 'white'
    };
    const { profilepic } = props.userInfo;
    if (profilepic && loading) setImage(uid);

    useEffect(()=>{
        setState({
            ...state,
            uid: user.uid,
            displayName: user.displayName
        })
    },[]);
    
    return (
        <nav>
            <h3>Burger</h3>
            <ul className="navLinks">
                <li>{`${displayName}`}</li>

                {imageComponent}

                <Link style={navStyle} to='/' onClick={signOut}>
                    <li>Se déconnecter</li>
                </Link>
            </ul>
        </nav>
    )
}


export default Nav;
