import React, { createContext } from "react";

export default React.createContext({
    selectClasse: false,
    option: "",
    updateComp: name => {},
    updateOption: name => {}
})