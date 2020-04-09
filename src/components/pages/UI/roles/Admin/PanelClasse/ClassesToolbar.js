import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./ClassesList.css"


const ClassesList = props => {
    useEffect(() => {
        document.body.style.background = "white";

    }, [])
    const handleClick = (event) => {
        alert("create Class")
    }
    return (
        <div className="toolbar">
            <h1 className="toolTitle">Gestion des classes</h1>
            <input type="text" name="className" id="className" placeholder="Entrer nom" />
            <FontAwesomeIcon className="addBtn" icon={faPlus} size="4x" onClick={handleClick} />
        </div>
    )
}
export default ClassesList