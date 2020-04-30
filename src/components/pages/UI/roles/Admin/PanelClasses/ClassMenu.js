import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { storageRef, db } from "../../../../../../scripts/services/firebase";
import { Link } from 'react-router-dom'

const ClassMenu = (props) => {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(true)
    const [noStuds, setNoStuds] = useState(false)
    useEffect(() => {
        if (loading && props.rowData.uid.length > 0) {
            db.collection("classes").doc(props.rowData.uid).get().then(function (doc) {
                if (doc.exists) {
                    const { eleves } = doc.data()
                    if (eleves.length === 0) setNoStuds(true)
                    eleves.forEach(eleve => {
                        db.collection("users").doc(eleve).get().then(function (doc) {
                            if (doc.exists) {
                                if (doc.data().profilepic) {
                                    storageRef.child(eleve).listAll().then(function (res) {
                                        res.items.forEach(function (itemRef) {
                                            itemRef.getDownloadURL().then((url) => {
                                                setUsersData(oldArray => [...oldArray, {uid:doc.id, displayName: `${doc.data().prenom} ${doc.data().nom}`, photoUrl: url }])
                                            }).catch(function (error) {
                                            });
                                        });
                                    }).catch(function (error) {
                                    });

                                } else {
                                    setUsersData(oldArray => [...oldArray, { uid:doc.id, displayName: `${doc.data().prenom} ${doc.data().nom}`, photoUrl: null }])
                                }
                            }
                        }).catch(function (error) {
                            console.log("Error getting document:", error);
                        });
                    });
                }
            })
            setLoading(false)
        }
        return
    }, [])
    return (
        <>
            {loading || noStuds ? <div className="loader"><p>Aucun élève.</p></div> : usersData.map((user, i) => {
                const { displayName, photoUrl,uid } = user;
                return <Link to={`/profile/${uid}`}><div key={i} style={{ margin: 10 }}><Tooltip title={displayName} ><Avatar alt={displayName} src={photoUrl} /></Tooltip></div></Link>
            })}
        </>

    )
}
export default ClassMenu;