import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./UsersToolbar.css"


const UsersToolbar = props => {
    useEffect(() => {
        document.body.style.background = "white";

    }, [])
    const handleClick = (event) => {
        alert('good')
    }
    return (
        <div className="toolbar">
            <h1 className="toolTitle">Gestion des utilisateurs</h1>
            <FontAwesomeIcon className="addBtn" icon={faPlus} size="4x" onClick={handleClick} />
        </div>
    )
}
export default UsersToolbar