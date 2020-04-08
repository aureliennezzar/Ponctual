import React, { useEffect,useState,useContext} from "react";
import UsersToolbar from "./UsersToolbar"
import UsersList from "./UsersList"
import CreateUser from "./CreateUser"
import "./Admin.css"



const Admin = props => {
  const [userCreation,setUserCreation] = useState(false)
  useEffect(() => {
    document.body.style.background = "white";
  }, [])
  return (
    <div className="adminPanel">
      <div className="container">
        <div className="left">
          <UsersToolbar setUserCreation={setUserCreation} />
          <UsersList />

        </div>
        <div className="right">

          <h1>Gestion des classes</h1>

        </div>
      </div>
      
      {userCreation ? <CreateUser setUserCreation={setUserCreation}  /> : null }
      
    </div>
  )
}
export default Admin