import React, { useState, useEffect } from "react";

const Admin = props => {
  useEffect(() => {
    document.body.style.background = "white";

  }, [])
  return (
    <div>
    <h1>Vous êtes connecté en tant qu'administrateur ! </h1>
    </div>
  )
}
export default Admin