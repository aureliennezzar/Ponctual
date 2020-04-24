import React from 'react'
import { auth, db } from '../../../../scripts/services/firebase'
let userR = ''
db.collection("users").doc(auth().currentUser.uid).then((doc)=>{
    userR = doc.data().role
})
export const userRole=userR