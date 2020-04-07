import React, { useEffect } from "react";

const Teacher = props => {
  useEffect(() => {
    document.body.style.background = "white";

  }, [])
  return (
    <div>
      <h1>Vous êtes connecté en tant que formateur ! </h1>
    </div>
  )
}
export default Teacher