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
import loader from './assets/loader.gif'
import TimeTablePanel from './components/pages/UI/TimeTablePanel/TimeTablePanel';
import TimeTable from './components/pages/UI/TimeTablePanel/TimeTable.js';


const App = (props) => {
  const [state, setState] = useState({
    authenticated: false,
    loading: true,
    user: null,
    role: null,
    userInfo: {}
  })
  useEffect(() => {
    document.body.style.background = "#F4F7F6";
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUserRole(user.uid, state, setState);
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
  const { authenticated, loading, role, userInfo } = state;

  return loading ? <div className="loader"><img src={loader}></img></div> : (
    <Router>
      <Switch>
        <PublicRoute exact path="/" authenticated={authenticated} component={Login} role={role}></PublicRoute>
        <PrivateRoute path="/panel" authenticated={authenticated} component={Panel} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute exact path="/scheduler" authenticated={authenticated} component={TimeTablePanel} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute path="/scheduler/:id" authenticated={authenticated} component={TimeTable} role={role} userInfo={userInfo}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;