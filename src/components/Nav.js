import React, { useState, useEffect } from 'react';
import { auth, db, storageRef } from "../scripts/services/firebase";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Nav.css';
import PictureNav from './PictureNav';
import HomeNav from './HomeNav';
const Nav = props => {
    const [state, setState] = useState({
        imageComponent: <AccountCircleIcon fontSize="large" />,
        loading: true,
        user: null
    })
    const [displayName, setDisplayName] = useState('')
    const { loading, imageComponent } = state;
    const { profilepic } = props.userInfo;


    useEffect(() => {

        const user = auth().currentUser;
        if (user && loading) {
            console.log(user)
            setState({ ...state, user })
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
                if (loading) {
                    if (doc.data().profilePicChanged) {
                        setUser(user)
                    }
                }

            });
    }

    return (
        <nav>

            <div className="leftNav">
                <HomeNav userInfo={props.userInfo} />
            </div>

            <div className="middleNav">
                <p>LOGO</p>
            </div>
            <div className="rightNav">

                <PictureNav imageComponent={imageComponent} displayName={displayName.toLowerCase()} />
            </div>


        </nav>
    )
}


export default Nav;
