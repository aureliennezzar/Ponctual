import React, { useState, useEffect } from 'react';
import { db, storageRef } from '../../../../../scripts/services/firebase'
import Nav from '../../../../Nav'
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import firebase from 'firebase';
import './CallRoll.css'

const CallRoll = props => {
    const { classe } = props.location.state.actualAppointment
    const { actualAppointment, teacherUid } = props.location.state
    const [noStuds, setNoStuds] = useState(false)
    const [usersData, setUsersData] = useState([])
    const [state, setState] = useState({
        actualAppointment,
        teacherUid,
        loading: true,
        isFirstCallRoll: true,
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (loading) {
            db.collection('classes').where("nom", "==", classe)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        db.collection("classes").doc(doc.id).get().then(function (doc) {
                            if (doc.exists) {
                                const { eleves } = doc.data()
                                if (eleves.length === 0) setNoStuds(true)
                                eleves.forEach(eleve => {
                                    db.collection("users").doc(eleve).get().then(function (doc) {
                                        if (doc.exists) {
                                            let statusAppointmentDate = 0
                                            if (Object.keys(doc.data().status[1]).length !== 0) {
                                                statusAppointmentDate = doc.data().status[1].startDate.seconds
                                            }
                                            const actualAppointmentDate = Math.round(actualAppointment.startDate.getTime() / 1000)

                                            if (statusAppointmentDate !== actualAppointmentDate) {
                                                if (state.isFirstCallRoll) {
                                                    console.log("FIRST CALL ROLL")
                                                    db.collection("users").doc(state.teacherUid).update({
                                                        firstCallRoll: new Date()
                                                    })
                                                }
                                                db.collection("users").doc(eleve).update({
                                                    status: ["absent", actualAppointment],
                                                    absences: firebase.firestore.FieldValue.arrayUnion(actualAppointment)
                                                })
                                            } else {
                                                setState({
                                                    ...state,
                                                    isFirstCallRoll: false
                                                })
                                            }
                                            if (doc.data().profilepic) {
                                                storageRef.child(eleve).listAll().then(function (res) {
                                                    res.items.forEach(function (itemRef) {
                                                        itemRef.getDownloadURL().then((url) => {
                                                            setUsersData(oldArray => [...oldArray, { status: doc.data().status[0], uid: eleve, displayName: `${doc.data().prenom} ${doc.data().nom}`, photoUrl: url }])
                                                        }).catch(function (error) {
                                                        });
                                                    });
                                                }).catch(function (error) {
                                                });

                                            } else {
                                                setUsersData(oldArray => [...oldArray, { status: doc.data().status[0], uid: eleve, displayName: `${doc.data().prenom} ${doc.data().nom}`, photoUrl: null }])
                                            }
                                        }
                                    }).catch(function (error) {
                                        console.log("Error getting document:", error);
                                    });
                                });
                            }
                        })
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });


            setLoading(false)
        }
    })
    const handleClick = (e) => {

        const timestamp = new Date();
        if (timestamp > new Date(actualAppointment.endDate)) return
        const eventStyle = e.currentTarget.style
        const style = e.currentTarget.getAttribute("style")
        const uid = e.currentTarget.getAttribute("data-uid")
        switch (true) {
            case style.indexOf("green") >= 0 || style.indexOf("orange") >= 0:
                db.collection("users").doc(uid).update({
                    status: ["absent", actualAppointment],
                    absences: firebase.firestore.FieldValue.arrayUnion(actualAppointment)
                })
                if (style.indexOf("orange") >= 0) {
                    db.collection("users").doc(uid).update({
                        retards: firebase.firestore.FieldValue.arrayRemove(actualAppointment)
                    })
                }
                eventStyle.border = '2px solid red'

                break;
            default:
                db.collection('users').doc(state.teacherUid).get().then((doc) => {
                    const { firstCallRoll } = doc.data()
                    console.log(new Date(firstCallRoll.seconds * 1000))
                    let diffInMilliSeconds = Math.abs(timestamp - new Date(firstCallRoll.seconds * 1000)) / 1000;
                    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
                    diffInMilliSeconds -= minutes * 60;
                    db.collection("users").doc(uid).update({
                        absences: firebase.firestore.FieldValue.arrayRemove(actualAppointment)
                    })
                    console.log(minutes)
                    if (minutes >= 5) {
                        eventStyle.border = '2px solid orange'
                        db.collection("users").doc(uid).update({
                            status: ["retard", actualAppointment],
                            retards: firebase.firestore.FieldValue.arrayUnion(actualAppointment),
                        })

                    } else {
                        eventStyle.border = '2px solid green'
                        db.collection("users").doc(uid).update({
                            status: ["present", actualAppointment],
                        })

                    }
                })

                break;
        }

    }

    return (
        <>
            <Nav userInfo={props.userInfo} />
            <div className="callRollPanelCtnr">
                <div className="callRollPanel">
                    <div style={{
                        width: "80%",
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: "1px solid rgb(207, 212, 212)",
                        marginBottom: "25px"
                    }}>
                        <h2>Faire l'appel</h2>
                    </div>

                    <div style={{ width: "80%" }}>
                        <div className="studentsCtnr">
                            {loading || noStuds ? <div className="loader"><p>Aucun élève.</p></div> : usersData.map((user, i) => {
                                const { displayName, photoUrl, uid, status } = user;
                                let couleur = ""
                                switch (status) {
                                    case "absent":
                                        couleur += "red"
                                        break;
                                    case "present":
                                        couleur += "green"
                                        break;
                                    case "retard":
                                        couleur += "orange"
                                        break;
                                    default:
                                        break;
                                }
                                return <div key={i} style={{ margin: 5, borderRadius: "50%" }}  >
                                    <Tooltip title={displayName} >
                                        <Avatar style={{ border: `2px solid ${couleur}`, cursor: "pointer" }} data-uid={uid} onClick={handleClick} alt={displayName} src={photoUrl} ></Avatar>
                                    </Tooltip>
                                </div>
                            })}
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>send</Icon>}
                        className="sc_submitBtn"
                        type="submit"
                    >
                        Envoyer
                      </Button>
                </div>
            </div>
        </>
    )
}

export default CallRoll;