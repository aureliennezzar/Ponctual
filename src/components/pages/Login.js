import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
import { signin } from "../../scripts/auth";
import './Login.css'
import { translateError } from '../../scripts/authApiErrors'

const Login = props => {
    const [state, setState] = useState({
        error: null,
        email: '',
        password: ''
    })
    const {error, email, password} = state
    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({ ...state, error: '' });
        try {
            await signin(email, password);
        } catch (error) {
            //Traduit l'erreur
            if (translateError(error.code).length > 0) {
                //Affichage erreur traduite a l'utilisateur
                setState({ error: translateError(error.code) });
            } else {
                //Affichage erreur dans la console si cela ne peut pas etre traduit
                console.log(error);
            }
        }
    }
    return (
        <div className="bdImage">
            <form
                className="loginPanel"
                // autoComplete="off"
                onSubmit={handleSubmit}>
                <h1>
                    Ponctual
                </h1>
                <p className="loginLabel">Remplir ici afin de vous connecter</p>
                <div>
                    <input className="inputs" placeholder="Email" name="email" onChange={handleChange} value={email} type="email" />
                </div>
                <div>
                    <input className="inputs" placeholder="Mot de passe" name="password" onChange={handleChange} value={password} type="password" />
                </div>
                <div>
                    {error ? <p className="errorLabel">{error}</p> : null}
                    <button className="loginBtn" type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    )
}

export default Login;