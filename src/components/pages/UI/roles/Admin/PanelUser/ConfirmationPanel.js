import React from "react";
import { db } from "../../../../../../scripts/services/firebase"
import './ConfirmationPanel.css'

const ConfirmationPanel = props => {
    const handleClick = () => {
        props.setDeleteConfirmation(false)
    }
    const handleConfirm = () => {
        props.setDeleteConfirmation(false)
        db.collection("users").doc(props.userId).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
    return (
        <div>
            <div className="confirmationPanel" onClick={handleClick}>
                <button id="cp_confirm" className="confirmationBtn" onClick={handleConfirm}>Confirmer</button>
                <button id="cp_abort" className="confirmationBtn" onClick={handleClick}>Annuler</button>
            </div>

            <div className="overlay" onClick={handleClick}></div>
        </div>


    )
}
export default ConfirmationPanel