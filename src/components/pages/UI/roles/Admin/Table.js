import React, { useEffect, useState } from 'react'
import { db } from "../../../../../scripts/services/firebase";
import "./Table.css"

const Table = () => {
    const [userList, setUserlist] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        db.collection("users")
            .onSnapshot(function (querySnapshot) {
                const userTab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, prenom, role } = doc.data()
                    if(role!='admin'){
                        userTab.push({ nom, prenom, role, uid: doc.id })
                    }
                });
                setUserlist(userTab); setLoading(false)
            });
    }, [])
    const handleDelete = (event) => {
        db.collection("users").doc(event.target.id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
    const renderTableData = () => {
        return userList.map((user) => {
            const { uid, nom, prenom, role } = user //destructuring
            return (
                <tr key={uid}>
                    <td>{prenom} {nom}</td>
                    <td>{role}</td>
                    <td><button id={uid} onClick={handleDelete}>Supprimer</button><button>Modifier</button></td>
                </tr>
            )
        })
    }
    let table =
        <table id='users'>
            <tbody>
                <tr>
                    <th key={0}>Nom et prénom</th>
                    <th key={1}>role</th>
                    <th key={2}>Supprimer / Modifier</th>
                </tr>
                {renderTableData()}
            </tbody>
        </table>
    return (
        <div className="list">
            {table}
        </div>
    )
}
export default Table;
