import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../../scripts/services/firebase";
import "./Student.css"

const Student = props => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({
    user: "",
    appointments: [],
  })
  useEffect(() => {
    document.body.style.background = "#F4F7F6";
    initAppointments()
    setLoading(false)
    return () => {
      setLoading(true)
    }
  }, [])

  const initAppointments = () => {
    db.collection("users").doc(auth().currentUser.uid).get().then((doc) => {
      db.collection("classes").doc(doc.data().classe).get().then((doc) => {
        const { appointments } = doc.data()
        setState({
          ...state,
          appointments
        })
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
  console.log(state)
  return (
    <div className="studentPanel">
      {loading === false && state.user && <h1>Bonjour, {state.user.displayName}</h1>}
      <div className="nextCourseStudent">
        <p>Votre prochain cours commence a xH</p>
        <div className="nextCourseInfosStudent">
          <p>Infos du cours</p>
        </div>
      </div>
    </div>
  )
}
export default Student