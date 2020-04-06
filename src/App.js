import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { auth } from "./scripts/services/firebase";
import { setUserRole } from "./scripts/setUserRole";
import { PublicRoute } from "./components/routes/PublicRoute"
import { PrivateRoute } from "./components/routes/PrivateRoute"
import Panel from "./components/pages/UI/Panel";
import Login from "./components/pages/Login"

const App = (props) => {
  const [state, setState] = useState({
    authenticated: false,
    loading: true,
    user: null,
    role: null,
    userInfo: {}
  })
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUserRole(user.email, state, setState);
        setState({
          ...state,
          user
        });
      } else {
        setState({
          ...state,
          authenticated: false,
          loading: false,
          user: null
        });
      }
    })
  }, []);
  const {authenticated, loading, role, userInfo} = state;

  return loading === true ? <h2>Loading...</h2> : (
    <div >
      <Router>
        <Switch>
          <PublicRoute exact path="/" authenticated={authenticated} component={Login} role={role}></PublicRoute>
          <PrivateRoute path="/panel" authenticated={authenticated} component={Panel} role={role} userInfo={userInfo}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;