import React, { Component } from "react";

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
          <h1>Panneau de controle formateur</h1>
        </div>
    )
  }
}
