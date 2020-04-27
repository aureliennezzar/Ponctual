import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";

export function PrivateRoute({ component: Component, authenticated, role, userInfo, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        console.log(Component.name)
        if (!authenticated) {
          // not logged in so redirect to home
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        } else if (
        Component.name === "TimeTablePanel" && role != "admin" || 
        Component.displayName === "WithStyles(TimeTableAdmin)" && role != "admin" || 
        Component.name === "TimeTable" && role === "admin" ||
        Component.name === "Admin" && role != "admin" ||
        Component.name === "CallRoll" && role != "teacher" 
        ) {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
        // authorised so return component
        return <Component {...props} userInfo={userInfo} />

      }} />
  )
}