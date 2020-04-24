import React, { useState, useEffect } from "react";
import { auth } from "../../../../../scripts/services/firebase";
import "./Teacher.css"

const Teacher = props => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    document.body.style.background = "#F4F7F6";
    setUser(auth().currentUser)
    setLoading(false)
    return () => {
      setLoading(true)
    }
  }, [])
  return (
    <div className="teacherPanel">
      {loading === false && user && <h1>Bonjour, {user.displayName} Eleve</h1>}
      <div className="nextCourseTeacher">
          <p>Votre prochain cours commence a xH</p>
        <div className="nextCourseInfosTeacher">
          <p>Infos du cours</p>
        </div>
      </div>
    </div>
  )
}
export default Teacher