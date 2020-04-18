import React, { useState, useEffect } from "react";
var style = {
    backgroundColor: "#747272",
    color: "#FFF",
    borderTop: "1px solid #535151",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    justifyContent: "center"
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function Footer() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <p>© 2020 Ponctual - All Rights Reserved</p>
                <p>Created by Aurélien Tallet <a href='https://github.com/Aurelien-Tallet'>Github</a> & Aurélien Nezzar <a href='https://github.com/strak-stark'>Github</a></p>
            </div>
        </div>
    )
}

export default Footer