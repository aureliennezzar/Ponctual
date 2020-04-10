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
        const { uid, displayName } = user;
        if (profilepic) {
            const profilePictureRef = storageRef.child(`${uid}/profile_64x64.jpg`);
            profilePictureRef.getDownloadURL().then((url) => {
                setState({...state, imageComponent: <img src={url} style={{ borderRadius: '50%', cursor: "pointer" }} alt={url} />})
            }).catch(function (error) {
            });
        }
        setDisplayName(displayName);
        setState({...state, loading:false});
    }



    const navStyle = {
        color: 'white'
    };
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
