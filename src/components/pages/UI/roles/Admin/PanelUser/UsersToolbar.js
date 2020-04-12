import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./UsersToolbar.css"


const UsersToolbar = props => {
    useEffect(() => {
        document.body.style.background = "white";

    }, [])
    const handleClick = (event) => {
        props.setUserCreation(true)
    }
    return (
        <div className="leftToolbar">
            <h1 className="toolTitle">Gestion des utilisateurs</h1>
            <FontAwesomeIcon className="addBtn" icon={faPlus} size="4x" onClick={handleClick} />
        </div>
    )
}
export default UsersToolbar