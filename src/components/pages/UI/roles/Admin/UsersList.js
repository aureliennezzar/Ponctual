import React, { useEffect } from "react";
import "./UsersList.css"


const UsersList = props => {
    useEffect(() => {
        document.body.style.background = "white";

    }, [])
    return (
        <div className="usersContainer">

            <div className="usersSelect">
                <select>
                    <option value="0">Filtrer par</option>
                    <option value="1">Élèves</option>
                    <option value="2">Formateurs</option>
                    <option value="3">Admins</option>
                </select>
            </div>  
            
            <div className="list">
            </div>

        </div>
    )
}
export default UsersList