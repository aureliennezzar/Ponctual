import React, { useState, useEffect } from "react";
import Nav from "../../../components/Nav"
import Admin from "./roles/Admin/Admin";
import Student from "./roles/Student/Student";
import Teacher from "./roles/Teacher/Teacher";
import Footer from '../../Footer'

const Panel = (props) => {
  const [panel, setPanel] = useState(null)
  useEffect(() => {
    document.body.style.background = "#F4F7F6";
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
    <>
      <Nav userInfo={props.userInfo} />
      {panel}
    </>
  )
}

export default Panel;
