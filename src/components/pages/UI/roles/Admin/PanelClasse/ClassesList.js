import React, { useState, useEffect } from "react";
import "./ClassesList.css"

const ClassesList = props => {
    const [state, setState] = useState({})
    const handleClick = (event) =>{
        const fb_studList = [
            {nom: "NEZZAR", prenom: "Aurélien", role:"student"},
            {nom: "Bricks", prenom: "bang", role:"student"},
            {nom: "yo", prenom: "wsh", role:"student"}
        ]
        const studList = 
        <div className="studList">
            <p>Liste élèves :</p>
            
            <ul>
            {fb_studList.map(eleve => (
                <li>- {eleve.nom} {eleve.prenom}</li>
            ))}
            </ul>
        </div>
        setState({
            ...state,
            [event.target.getAttribute("data-id")]: [studList,true]
        })
    }

    return (
        <div className="classesList">
            <div className="classContainer" id="fi_dev">
                <p>Classe : fi-dev</p>
                <p>Nombre d'élèves : 0</p>
                <p>Proffesseur principal : Mister Freeze</p>
                {state.fi_dev}
                <div data-id="fi_dev" className="classArrow" onClick={handleClick}>V</div>
            </div>
            <div className="classContainer">
                <p>Classe : nom</p>
                <p>Nombre d'élèves : 0</p>
                <p>Proffesseur principal : Mister Freeze</p>

            </div>
        </div>
    )
}
export default ClassesList