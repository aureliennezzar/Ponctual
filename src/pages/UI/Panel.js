import React, { Component } from "react";
import Nav from "../../components/Nav"
import Admin from "./roles/admin";
import Student from "./roles/student";
import Teacher from "./roles/teacher";
import "./UI.css"

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: null
    };
  }


  componentDidMount() {
    document.body.style.background = "white";
    let { role } = this.props.userInfo
    if(role==="admin"){ 
      this.setState({ panel: <Admin /> })
    } else if(role==="teacher"){ 
      this.setState({ panel: <Teacher /> })
    } else if(role==="student"){ 
      this.setState({ panel: <Student /> })
    }
  }
  render() {
    return (
      <div>
        <Nav userInfo={this.props.userInfo} />
        {this.state.panel}
      </div>
    )
  }
}
