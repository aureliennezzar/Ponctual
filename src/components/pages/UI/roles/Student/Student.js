import React, { useState, useEffect } from "react";

const Student = props => {
  useEffect(() => {
    document.body.style.background = "white";

  }, [])
  return (
    <div>
    <h1>Vous êtes connecté en tant qu'élève ! </h1>
    </div>
  )
}
export default Student