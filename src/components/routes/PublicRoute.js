import React from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";
  
export function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/acceuil" }} />}
    />
  )
}