import React, { Component } from "react";
// import { Link, useParams } from "react-router-dom";
import { signin } from "../scripts/auth";
import './Login.css'
import { translateError } from '../scripts/authApiErrors'

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
            //Traduit l'erreur
            if (translateError(error.code).length > 0) {
                //Affichage erreur traduite a l'utilisateur
                this.setState({ error: translateError(error.code) });
            } else {
                //Affichage erreur dans la console si cela ne peut pas etre traduit
                console.log(error);
            }
        }
    }
    render() {
        return (
            <div className="bdImage">
                <form
                    className="loginPanel"
                    autoComplete="off"
                    onSubmit={this.handleSubmit}>
                    <h1>
                        Ponctual
                </h1>
                    <p>Remplir ici afin de vous connecter</p>
                    <div>
                        <input className="inputs" placeholder="Email" name="email" pattern="[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$" onChange={this.handleChange} value={this.state.email} type="email" />
                    </div>
                    <div>
                        <input className="inputs" placeholder="Mot de passe" name="password" onChange={this.handleChange} value={this.state.password} type="password" />
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button className="loginBtn" type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
        )
    }
}