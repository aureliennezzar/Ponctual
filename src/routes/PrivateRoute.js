import React from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";

export function PrivateRoute({ component: Component, authenticated, ...rest }) {

    return (
      <Route
        {...rest}
        render={props => {
          if (!authenticated) {
            // not logged in so redirect to home
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          }
          // authorised so return component
          return <Component {...props} userInfo={rest.userInfo}/>
  
        }} />
    )
  }