import React, { useState, useEffect } from "react";
import Nav from "../../../components/Nav"
import Admin from "./roles/admin";
import Student from "./roles/student";
import Teacher from "./roles/teacher";
import "./UI.css"

const Panel = props => {
  const [panel, setPanel] = useState(null)
  useEffect(() => {
    document.body.style.background = "white";
    let { role } = props.userInfo
    if (role === "admin") {
      setPanel(<Admin />)
    } else if (role === "teacher") {
      setPanel(<Teacher />)
    } else if (role === "student") {
      setPanel(<Student />)
    }
  }, [])

  return (
    <div>
      <Nav userInfo={props.userInfo} />
      {panel}
    </div>
  )
}

export default Panel;
