import React, { useEffect,useState,useContext} from "react";
import UsersToolbar from "./UsersToolbar"
import UsersList from "./UsersList"
import CreateUser from "./CreateUser"
import ConfirmationPanel from "./ConfirmationPanel"
import "./Admin.css"



const Admin = props => {
  const [userCreation,setUserCreation] = useState(false)
  const [deleteConfirmation,setDeleteConfirmation] = useState(false)
  const [userId,setUserId] = useState("")
  useEffect(() => {
    document.body.style.background = "white";
  }, [])
  return (
    <div className="adminPanel">
      <div className="container">
        <div className="left">
          <UsersToolbar setUserCreation={setUserCreation} />
          <UsersList setUserId={setUserId} setDeleteConfirmation={setDeleteConfirmation}/>

        </div>
        <div className="right">

          <h1>Gestion des classes</h1>

        </div>
      </div>
      
      {userCreation ? <CreateUser setUserCreation={setUserCreation}  /> : null }
      {deleteConfirmation ? <ConfirmationPanel userId={userId} setDeleteConfirmation={setDeleteConfirmation}  /> : null }
      
    </div>
  )
}
export default Admin