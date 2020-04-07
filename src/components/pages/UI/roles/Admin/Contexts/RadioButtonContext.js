import React from "react";

export default React.createContext({
    selectClasse: false,
    option: "",
    updateComp: name => {},
    updateOption: name => {}
})