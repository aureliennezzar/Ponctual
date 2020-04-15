import React, { useEffect, useState, useContext } from "react";
<<<<<<< HEAD
import UsersList from "./PanelUser/UsersList"
import ClassesList from "./PanelClasses/ClassesList"
=======
import ClassesToolbar from "./PanelClasse/ClassesToolbar"
import ClassesList from "./PanelClasse/ClassesList"
import UsersList from "./PanelUser/UsersList"
>>>>>>> 1f2dc0b4ba233e528e52d4b3a2f3f5123419a38f
import { createMuiTheme } from "@material-ui/core/"
import "./Admin.css"

const theme = createMuiTheme({
  scroller: {
    backgroundColor: "#000"
  },
  typography: {
    background: '#000'
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&:last-child td": {
          borderBottom: 0,
        },
      }
    },
    MuiTable: {
      root: {

        shadows: 'none'
      }
    },
    MuiToolbar: {
      root: {
        backgroundColor: '#F4F7F6'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#F4F7F6',
        shadows: 'none'
      }
    }

  }
})

const Admin = props => {
  return (
    <div className="adminPanel">
      <div className="left">
        <div className="panelUsersNav">
          <h2>Gestion des utilisateurs</h2>
        </div>
<<<<<<< HEAD

        <UsersList theme={theme} />

      </div>
      <div className="right">
        <div className="panelClassesNav">
          <h2>Gestion des classes</h2>
        </div>
        <ClassesList theme={theme} />

=======
        <UsersList theme={theme} />

      </div>
      <div className="right">
        <ClassesToolbar />
        <ClassesList />

>>>>>>> 1f2dc0b4ba233e528e52d4b3a2f3f5123419a38f
      </div>
    </div>
  )
}
export default Admin