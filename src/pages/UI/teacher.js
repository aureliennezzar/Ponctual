import React, { Component } from "react";
import Nav from "../../components/Nav"
import "./UI.css"

export default class Teacher extends Component {
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
        <Nav />
        <div className="home">
          <h1>Panneau de controle formateur</h1>
        </div>
      </div>
    )
  }
}
