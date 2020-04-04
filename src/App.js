import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { auth } from "./services/firebase";
import { setUserRole } from "./scripts/setUserRole";
import { PublicRoute } from "./routes/PublicRoute"
import { PrivateRoute } from "./routes/PrivateRoute"
import Panel from "./pages/UI/Panel";
import Login from "./pages/Login"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      user: null,
      role: null
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
            <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Login} role={this.state.role}></PublicRoute>
            <PrivateRoute path="/panel" authenticated={this.state.authenticated} component={Panel} role={this.state.role} userInfo={this.state.userInfo}></PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;