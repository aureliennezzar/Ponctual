import React, { useEffect,useState,useContext} from "react";
import UsersToolbar from "./PanelUser/UsersToolbar"
import UsersList from "./PanelUser/UsersList"
import ClassesToolbar from "./PanelClasse/ClassesToolbar"
import ClassesList from "./PanelClasse/ClassesList"
import CreateUser from "./PanelUser/CreateUser"
import ConfirmationPanel from "./PanelUser/ConfirmationPanel"
import "./Admin.css"



const Admin = props => {
  const [userCreation,setUserCreation] = useState(false)
  const [classesCreation,setClassesCreation] = useState(false)
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
          <UsersList setUserId={setUserId} setDeleteConfirmation={setDeleteConfirmation} />

        </div>
        <div className="right">
        <ClassesToolbar setClassesCreation={setClassesCreation}/>
        <ClassesList />

        </div>
      </div>
      
      {userCreation ? <CreateUser setUserCreation={setUserCreation}  /> : null }
      {deleteConfirmation ? <ConfirmationPanel userId={userId} setDeleteConfirmation={setDeleteConfirmation}  /> : null }
      
    </div>
  )
}
export default Admin