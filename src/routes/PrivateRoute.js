import React from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";

export function PrivateRoute({ component: Component, authenticated, userRole, ...rest }) {

    return (
      <Route
        {...rest}
        render={props => {
          if (!authenticated) {
            // not logged in so redirect to home
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          }
          // check if route is restricted by role
          if (Component.name.toLowerCase()!==userRole) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: userRole }} />
          }
  
          // authorised so return component
          return <Component {...props} userInfo={rest.userInfo}/>
  
        }} />
    )
  }