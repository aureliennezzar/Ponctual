import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import ControlPanel from './pages/ControlPanel';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/ControlPanel' />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      user: null
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({
          authenticated: true,
          loading: false,
          user: user
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
          user: null
        });
      }
    })
  }
  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <div >
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Login}></Route> */}
            <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Login}></PublicRoute>
            <PrivateRoute path="/controlpanel" authenticated={this.state.authenticated} component={ControlPanel} ></PrivateRoute>
            <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;