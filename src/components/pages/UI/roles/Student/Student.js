import React, { useState, useEffect } from "react";
import { auth } from "../../../../../scripts/services/firebase";
import "./Student.css"
import { cleanup } from "@testing-library/react";

const Student = props => {
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
    <div className="studentPanel">
      {loading === false && user && <h1>Bonjour, {user.displayName} (Eleve) </h1>}
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