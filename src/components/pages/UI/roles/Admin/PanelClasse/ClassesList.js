import React, { useState, useEffect } from "react";

import "./ClassesList.css"

const ClassesList = props => {
    useEffect(() => {
        document.body.style.background = "white";
    }, [])
    return (
        <div>
            Liste classes
        </div>
    )
}
export default ClassesList