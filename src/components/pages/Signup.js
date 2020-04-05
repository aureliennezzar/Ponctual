import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../components/auth';
import "./Signup.css"

export default class Signup extends Component {
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
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }
    render() {
        return (
            <form className="loginPanel" onSubmit={this.handleSubmit}>
                <h1>
                    S'inscrire à
                    <Link to="/">Ponctual</Link>
                </h1>
                <p>Fill in the form below to create an account</p>
                <div>
                    <input className="inputs" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} type="email" />
                </div>
                <div>
                    <input className="inputs" placeholder="Mot de passe" name="password" onChange={this.handleChange} value={this.state.password} type="password" />
                </div>
                <div>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <button className="loginBtn" type="submit">S'inscrire</button>
                </div>
                <hr></hr>
                <p>Tu as déjà un compte ? <Link to="/login">Se connecter</Link></p>
            </form>
        )
    }
}