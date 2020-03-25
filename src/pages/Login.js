import React from 'react';
import './Login.css'

function Login() {
  return (
    <div className="login">
      <h1 className="brandTitle">Ponctual</h1>
      <div className="loginPanel">
        <h1>Se connecter</h1>
        <input className="inputs" type="text" name="" placeholder="Nom d'utilisateur" />
        <input className="inputs" type="password" name="" placeholder="Mot de passe" />
        <input className="loginBtn" type="button" name="" value="Se connecter" />
      </div>
    </div>
  )
}

export default Login;
