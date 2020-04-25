import React, { useState, useEffect } from 'react';
import { auth } from "../scripts/services/firebase";
import { storageRef } from "../scripts/services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './Nav.css'
import PictureNav from './PictureNav'
const Nav = props => {
    const [state, setState] = useState({
        imageComponent: <FontAwesomeIcon icon={faUserCircle} size="2x" />,
        loading: true
    })
    const [displayName, setDisplayName] = useState('')
    const { loading, imageComponent } = state;
    const { profilepic } = props.userInfo;


    useEffect(() => {
        const user = auth().currentUser;
        if (user && loading) {
            setUser(user)
        } else { setDisplayName("") }
    }, []);

    const setUser = user => {
        const { displayName } = user;
        if (profilepic.length > 0) {
            storageRef.child(profilepic).listAll().then(function (res) {

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
        db.collection('users').doc(profilepic).update({
            profilePicChanged:false
        })

        

    }

    const initListener = (user) => {
        db.collection('users').doc(profilepic)
            .onSnapshot(function (doc) {
              if(doc.data().profilePicChanged){
                  setUser(user)
              }
                
            });


    }

    return (
        <nav>
            <h3 style={{ left: 20, position: "fixed" }}>Menu enfant</h3>
            <div className="navCtnr">

                <p>LOGO</p>
                <ul className="navLinks">
                    <li>{`${displayName}`}</li>
                    <PictureNav imageComponent={imageComponent} profilepic={profilepic} />
                </ul>
            </div>
        </nav>
    )
}


export default Nav;
