import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { auth } from "./services/firebase";
import { setUserRole } from "./scripts/setUserRole";
import { PublicRoute } from "./routes/PublicRoute"
import { PrivateRoute } from "./routes/PrivateRoute"
import Admin from "./pages/UI/admin";
import Student from "./pages/UI/student";
import Teacher from "./pages/UI/teacher";
import Login from "./pages/Login"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      user: null,
      userRole: null
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUserRole(user.email, this)
        this.setState({
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
            <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Login} userRole={this.state.userRole}></PublicRoute>
            <PrivateRoute path="/admin" authenticated={this.state.authenticated} component={Admin} userRole={this.state.userRole} userInfo={this.state.userInfo}></PrivateRoute>
            <PrivateRoute path="/student" authenticated={this.state.authenticated} component={Student} userRole={this.state.userRole} userInfo={this.state.userInfo}></PrivateRoute>
            <PrivateRoute path="/teacher" authenticated={this.state.authenticated} component={Teacher} userRole={this.state.userRole}></PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;