import React, { useState, useEffect } from "react";
import { db } from '../../../../../../scripts/services/firebase'
import "./ClassesList.css"

const ClassesList = props => {
    const [state, setState] = useState({})
    const [classeTab, setClasseTab] = useState([])

    useEffect(() => {
        db.collection("classes")
            .onSnapshot(function (querySnapshot) {
                const tab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, eleves, professeur } = doc.data()
                    tab.push({ nom, eleves, professeur })
                });
                setClasseTab(tab)
            });
    }, [])

    const handleClick = (event) => {
        let display = true;
        const dataid = event.target.getAttribute("data-id")

        let code = `
        if(state.${dataid}){
            if(state.${dataid}[1]){
                setState({
                    ...state,
                    [event.target.getAttribute("data-id")]: [null, false]
                })
                display = false;
            }
        }`
        eval(code);

        if (display) {
            db.collection("classes").doc(dataid).get().then(function (doc) {
                if (doc.exists) {
                    const fb_studList = doc.data().eleves
                    const studList = fb_studList.map((eleve, index) => (
                        <li key={Math.random()*10}>- {eleve}</li>
                    ))
                    const divStudList =
                        < div className="studList" >
                            <p>Liste élèves :</p>
                            <ul key={Math.random()*10}>
                                {studList}
                            </ul>
                        </div >
                    const code = `
                    setState({
                        ...state,
                        ${dataid}: [divStudList, true]
                    })`
                    eval(code)

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    }
    return (
        <div className="classesList">
            {classeTab.map(classe => {
                const classid = `{state.${classe.nom}}`;
                return <div key={Math.random()*10} className="classContainer" id={classe.nom}>
                    <p>Classe : {classe.nom}</p>
                    <p>Nombre d'élèves : {classe.eleves.length}</p>
                    <p>Proffesseur principal : {classe.professeur}</p>
                    {eval(classid)}
                    <div data-id={classe.nom} className="classArrow" onClick={handleClick}>V</div>
                </div>
            })}
        </div>
    )
}
export default ClassesList