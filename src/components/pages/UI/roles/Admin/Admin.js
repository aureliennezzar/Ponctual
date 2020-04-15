import React, { useEffect, useState, useContext } from "react";
import UsersList from "./PanelUser/UsersList"
import ClassesList from "./PanelClasses/ClassesList"
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

        <UsersList theme={theme} />

      </div>
      <div className="right">
        <div className="panelClassesNav">
          <h2>Gestion des classes</h2>
        </div>
        <ClassesList theme={theme} />

      </div>
    </div>
  )
}
export default Admin