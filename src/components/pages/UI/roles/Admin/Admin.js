import React, { useEffect, useState, useContext } from "react";
import ClassesToolbar from "./PanelClasse/ClassesToolbar"
import ClassesList from "./PanelClasse/ClassesList"
import UsersList from "./PanelUser/UsersList"
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
          <p>Gestion des utilisateurs</p>
        </div>
        <UsersList theme={theme} />

      </div>
      <div className="right">
        <ClassesToolbar />
        <ClassesList />

      </div>
    </div>
  )
}
export default Admin