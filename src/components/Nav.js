import React, { useState, useEffect } from 'react';
import { auth, db } from "../scripts/services/firebase";
import { storageRef } from "../scripts/services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './Nav.css'
import PictureNav from './PictureNav'
const Nav = props => {
    const [state, setState] = useState({
        imageComponent: <FontAwesomeIcon icon={faUserCircle} size="2x" />,
        loading: true,
        user:null
    })
    const [displayName, setDisplayName] = useState('')
    const { loading, imageComponent } = state;
    const { profilepic } = props.userInfo;
    

    useEffect(() => {
        const user = auth().currentUser;
        if (user && loading) {
            setState({...state,user})
            setUser(user)
            initListener(user)
            
        } else { setDisplayName("") }
    }, []);

    const setUser = user => {
        const { displayName } = user;
        if (profilepic) {
            storageRef.child(user.uid).listAll().then(function (res) {

                res.items.forEach(function (itemRef) {
                    itemRef.getDownloadURL().then((url) => {

                        setState({ ...state, imageComponent: <img className="resize" src={url} style={{ borderRadius: '50%', cursor: "pointer" }} alt={url} /> })
                    }).catch(function (error) {
                    });
                });
            }).catch(function (error) {
            });

        }
        setDisplayName(displayName);
        setState({ ...state, loading: false });
        db.collection('users').doc(user.uid).update({
            profilePicChanged: false

        })
    }

    const initListener = (user) => {
        db.collection('users').doc(user.uid)
            .onSnapshot(function (doc) {
                if (doc.data().profilePicChanged) {
                    setUser(user)
                }

            });
    }

    return (
        <nav>
            <h3 style={{ left: 20, position: "fixed" }}>Menu enfant</h3>
            <div className="navCtnr">

                <p>LOGO</p>
                <div className="navLinks">
                    {`${displayName}`}
                   <div style={{zIndex:99999}}><PictureNav imageComponent={imageComponent}  /></div>
                </div>
            </div>
        </nav>
    )
}


export default Nav;
