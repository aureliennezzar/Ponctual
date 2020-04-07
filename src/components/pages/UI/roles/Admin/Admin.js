import React, { useEffect } from "react";
import UsersToolbar from "./UsersToolbar"
import UsersList from "./UsersList"
import CreateUser from "./CreateUser"
import "./Admin.css"

const Admin = props => {
  useEffect(() => {
    document.body.style.background = "white";

  }, [])
  return (
    <div className="adminPanel">
      <div className="container">
        <div className="left">
          <UsersToolbar />
          <UsersList />

        </div>
        <div className="right">

          <h1>Gestion des classe</h1>

        </div>
      </div>
      <CreateUser />
    </div>
  )
}
export default Admin