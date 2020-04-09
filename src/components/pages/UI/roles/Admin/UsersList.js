import React, { useState, useEffect } from "react";
import Table from "./Table";

import "./UsersList.css"

const UsersList = props => {
    const [state, setState] = useState({
        selectValue: "default",
        changed: false
    })
    useEffect(() => {
        document.body.style.background = "white";
    }, [])
    const handleChange = (event) => {
        setState({
            selectValue: event.target.value,
            changed: true
        })
    }
    return (
        <div className="usersContainer">
            <div className="usersSelect">
                <p>Filtrer par : </p>
                <select className="userSelect" onChange={handleChange}>
                    <option value="default">Tout</option>
                    <option value="student">Élèves</option>
                    <option value="teacher">Formateurs</option>
                </select>
            </div>
            <Table selectState={state} setSelectState={setState} setUserId={props.setUserId} setDeleteConfirmation={props.setDeleteConfirmation} />

        </div>
    )
}
export default UsersList