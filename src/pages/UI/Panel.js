import React, { Component } from "react";
import Nav from "../../components/Nav"
import Admin from "admin";
import Student from "student";
import Teacher from "teacher";
import "./UI.css"

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: '',
    };
  }
  componentDidMount() {
    document.body.style.background = "white";
  }
  render() {
    return (
      <div>
        <Nav userInfo={this.props.userInfo}/>

      </div>
    )
  }
}
