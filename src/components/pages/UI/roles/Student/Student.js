import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../../scripts/services/firebase";
import "./Student.css"

const Student = props => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({
    user: "Loading",
    nextAppointmentDate: [],
    nextAppointment: {}
  })
  const { location, formateur, notes, title } = state.nextAppointment
  useEffect(() => {
    if(loading){
      document.body.style.background = "#F4F7F6";
      const { currentUser } = auth()
      setState({
        ...state,
        user: currentUser
      })
      if(currentUser) initAppointments(currentUser)
      setLoading(false)
    }
    return () => {
      setLoading(true)
    }
  }, [])

  const initAppointments = (user) => {
    db.collection("users").doc(user.uid).get().then((doc) => {
      db.collection("classes").doc(doc.data().classe).get().then((doc) => {
        const appointments = doc.data().appointments.map(appointment => {
          appointment.startDate = new Date(appointment.startDate.seconds * 1000)
          appointment.endDate = new Date(appointment.endDate.seconds * 1000)
          return appointment
        })
        console.log(appointments)
        const nextAppointments = appointments.filter(appointment => {
          if (appointment.startDate > new Date()) {
            return appointment
          }
        })
        const courses = [];
        nextAppointments.forEach(appointment => {
          courses.push(appointment.startDate)
        });
        const goal = new Date();
        const nextAppointmentDate = courses.reduce(function (prev, curr) {
          return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });
        const nextAppointment = nextAppointments.filter(appointment => {
          if (appointment.startDate === nextAppointmentDate)
            return appointment
        })[0]
        const timeDiff = nextAppointmentDate.getTime() - new Date().getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
        let message = ""
        switch (true) {
          case (daysDiff === 0):
            message += "à"
            break;
          case (daysDiff === 1):
            message += "demain à"
            break;

          default:
            const dd = String(nextAppointmentDate.getDate()).padStart(2, '0');
            const mm = String(nextAppointmentDate.getMonth() + 1).padStart(2, '0');
            const nextDate = dd + '/' + mm;
            message += `le ${nextDate} à`
            break;
        }
        setState({
          ...state,
          nextAppointmentDate: [nextAppointmentDate.getHours(), message],
          nextAppointment,
        })
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
  if(loading === false && state.user) {
    console.log("display")
    console.log(loading, state.user)

  } else {
    console.log("dont display")
    console.log(loading, state.user)
  }
  return (
    <div className="studentPanel">
      {loading === false && state.user && <h1>Bonjour, {state.user.displayName}</h1>}
      <div className="nextCourseStudent">
        <p>Votre prochain cours commence {state.nextAppointmentDate[1]} {state.nextAppointmentDate[0]} H</p>
        <div className="nextCourseInfosStudent">
          <p>Infos du cours : {title}</p>
          <p>Formateur : {formateur}</p>
          <p>Salle : {location}</p>
          <p>Informations : {notes}</p>
        </div>
      </div>
    </div>
  )
}
export default Student