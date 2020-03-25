import React, { Component } from 'react';
import classRoom from './component/classRoom'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/aurelienbg" component={classRoom} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
