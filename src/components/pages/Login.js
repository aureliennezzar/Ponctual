import React, { Component } from "react";
// import { Link, useParams } from "react-router-dom";
import { signin } from "../../scripts/auth";
import './Login.css'
import { translateError } from '../../scripts/authApiErrors'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ ...this.state, error: '' });
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
                    // autoComplete="off"
                    onSubmit={this.handleSubmit}>
                    <h1>
                        Ponctual
                </h1>
                    <p className="loginLabel">Remplir ici afin de vous connecter</p>
                    <div>
                        <input className="inputs" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} type="email" />
                    </div>
                    <div>
                        <input className="inputs" placeholder="Mot de passe" name="password" onChange={this.handleChange} value={this.state.password} type="password" />
                    </div>
                    <div>
                        {this.state.error ? <p className="errorLabel">{this.state.error}</p> : null}
                        <button className="loginBtn" type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login;