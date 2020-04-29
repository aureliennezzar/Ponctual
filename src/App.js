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
import TimeTable from './components/pages/UI/TimeTablePanel/TimeTable';
import TimeTableAdmin from './components/pages/UI/TimeTablePanel/TimeTableAdmin';
import AdminGestion from './components/pages/UI/roles/Admin/AdminGestion'
import CallRoll from './components/pages/UI/roles/Teacher/CallRoll'
import NotFoundPage from './components/NotFoundPage'
import Profile from './components/pages/UI/Profile'


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
        <PrivateRoute exact path="/acceuil" authenticated={authenticated} component={Panel} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute exact path="/profile" authenticated={authenticated} component={Profile} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute exact path="/gestion" authenticated={authenticated} component={AdminGestion} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute exact path="/appel" authenticated={authenticated} component={CallRoll} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute exact path="/agenda" authenticated={authenticated} component={TimeTable} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute path="/agenda/admin/:id" authenticated={authenticated} component={TimeTableAdmin} role={role} userInfo={userInfo}></PrivateRoute>
        <PrivateRoute path="/appel/*" authenticated={authenticated} component={NotFoundPage}></PrivateRoute>
        <PrivateRoute path="/acceuil/*" authenticated={authenticated} component={NotFoundPage}></PrivateRoute>
        <PrivateRoute path="/gestion/*" authenticated={authenticated} component={NotFoundPage}></PrivateRoute>
        <PrivateRoute path="*" authenticated={authenticated} component={NotFoundPage}></PrivateRoute>
        {/* <PrivateRoute path="/agenda/*" authenticated={authenticated} component={NotFoundPage}></PrivateRoute> */}
      </Switch>
    </Router>
  );
}

export default App;