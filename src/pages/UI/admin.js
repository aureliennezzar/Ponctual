import React, { Component } from "react";
import Nav from "../../components/Nav"
import "./UI.css"

export default class Admin extends Component {
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
          <h1>Panneau de controle admin</h1>
          <form>

          </form>
        </div>
      </div>
    )
  }
}
