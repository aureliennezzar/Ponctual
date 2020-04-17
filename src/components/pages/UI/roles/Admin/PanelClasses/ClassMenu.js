import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { user } from 'firebase-functions/lib/providers/auth';
import { storageRef, db } from "../../../../../../scripts/services/firebase";

const ClassMenu = (props) => {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let unsubscribe = null
        if (loading) {
            unsubscribe = db.collection("classes").doc(props.rowData.uid)
                .onSnapshot(function (doc) {
                    doc.data().eleves.forEach(eleve => {
                        db.collection("users").doc(eleve).get().then(function (doc) {
                            if (doc.exists) {
                                setUsersData(oldArray => [...oldArray, { displayName: `${doc.data().prenom} ${doc.data().nom}` }])
                            }
                        }).catch(function (error) {
                            console.log("Error getting document:", error);
                        });
                    });

                })
            setLoading(false)
        }
        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <>
            {loading ? null : usersData.map((user, i) => {
                return <div key={i} style={{ margin: 10 }}><Tooltip title={user.displayName} ><Avatar alt={user.displayName} src={null} /></Tooltip></div>
            })}
        </>

    )
}
export default ClassMenu;