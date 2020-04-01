import React, { Component } from "react";
// import { Link, useParams } from "react-router-dom";
import {signin} from "../components/auth";
import './Login.css'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signin(this.state.email, this.state.password);
        } catch (error) {
            if(error.code === "auth/user-not-found"){
                let message = "Vous avez rentré un mauvais email ou mot de passe. Veuillez réessayer."
                this.setState({ error: message });
            }else{
                this.setState({ error: error.message });
            }
        }
    }
    render() {
        return (
            <form 
            className="loginPanel" 
            autoComplete="off"
            onSubmit={this.handleSubmit}>
                <h1>
                    Ponctual
                </h1>
                <p>Remplir ici afin de vous connecter</p>
                <div>
                    <input className="inputs" placeholder="Email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2, 4}?" onChange={this.handleChange} value={this.state.email} type="email" />
                </div>
                <div>
                    <input className="inputs" placeholder="Mot de passe" name="password" onChange={this.handleChange} value={this.state.password} type="password" />
                </div>
                <div>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <button className="loginBtn" type="submit">Se connecter</button>
                </div>
            </form>
        )
    }
}