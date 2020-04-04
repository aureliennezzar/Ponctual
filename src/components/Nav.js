import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { signOut } from "../scripts/auth";
import { storageRef } from "../services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
// import "./Nav.css"


class Nav extends Component {
    state = {
        imageComponent: <FontAwesomeIcon icon={faUserCircle} size="4x" />
    }
    setImage = (uid) => {
        const profilePictureRef = storageRef.child(`${uid}/profile_64x64.jpg`);
        profilePictureRef.getDownloadURL().then((url) =>{
            this.setState({imageComponent: <img src={url} style={{borderRadius: '50%',cursor: "pointer"}} alt={url}/>})
        }).catch(function (error) {
        });
    }
    render() {
        const navStyle = {
            color: 'white'
        }
        const { nom, prenom, email, profilepic } = this.props.userInfo;
        if (profilepic) this.setImage(email);
        return (
            <nav>
                <Link style={navStyle} to='/'>
                    <h3>Burger</h3>
                </Link>
                <ul className="navLinks">
                    <li>{`${nom} ${prenom}`}</li>

                    {this.state.imageComponent}

                    <Link style={navStyle} to='/' onClick={signOut}>
                        <li>Se déconnecter</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}

export default Nav;
