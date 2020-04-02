import React, { Component } from "react";
import Nav from "../components/Nav"
import "./ControlPanel.css"
import { auth } from "../services/firebase"

export default class ControlPanel extends Component {
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
          <h1>Panneau de configuration</h1>
        </div>
      </div>
    )
  }
}
