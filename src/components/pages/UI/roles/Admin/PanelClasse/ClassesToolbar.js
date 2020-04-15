import React, { useEffect, useState } from "react";
import { db } from "../../../../../../scripts/services/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./ClassesToolbar.css"


const ClassesList = props => {
    const [inputVal, setInputVal] = useState("")
    const handleChange = (event) => {
        setInputVal(event.target.value)
    }
    const handleClick = (event) => {
        if (inputVal.length > 0) {
            db.collection("classes").doc(inputVal).set({
                nom: inputVal,
                professeur: "Pas de formateur !",
                eleves: [],
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            setInputVal("")
        }
    }
    return (
        <div className="rightToolbar">
            <h2 className="toolTitle">Gestion des classes [W.I.P]</h2>
            <input type="text" name="className" id="className" placeholder="Entrer nom" onChange={handleChange} value={inputVal} />
            <FontAwesomeIcon className="addBtn" icon={faPlus} size="4x" onClick={handleClick} />
        </div>
    )
}
export default ClassesList