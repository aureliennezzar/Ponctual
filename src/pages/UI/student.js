import React, { Component } from "react";
import Nav from "../../components/Nav"
import "./UI.css"

export default class Student extends Component {
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
          <h1>Panneau de controle eleve</h1>
        </div>
    )
  }
}
