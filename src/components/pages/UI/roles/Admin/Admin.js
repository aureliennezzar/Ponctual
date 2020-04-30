import React, { useState, useEffect } from "react";
import { auth } from "../../../../../scripts/services/firebase";
import "./Admin.css"

const Admin = props => {
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
      {loading === false && user && <h1>Bonjour, ADMIN</h1>}
    </div>
  )
}
export default Admin