import React, { useState } from "react";
import RadioButtons from "./RadioButtons";
import RadioButtonContext from "./RadioButtonContext";
import SelectContext from "./SelectContext";
import Select from "./Select";
import Forms from "./Forms";
import { db } from "../../../../../scripts/services/firebase";
import { translateError } from '../../../../../scripts/authApiErrors'
import "./CreateUser.css"

const CreateUser = props => {
    const [selectClasse, setSelectClasse] = useState(true)
    const [selectValue, setSelectValue] = useState("default")
    const [role, setRole] = useState(null)
    const [state, setState] = useState({
        lname: null,
        fname: null,
        email: null,
        error: ""
    })
    const { lname, fname, email, error } = state;

    const RbContextValue = {
        selectClasse,
        option: role,
        updateComp: setSelectClasse,
        updateOption: setRole
    }
    const SelectContextValue = {
        selectValue,
        updateSelectValue: setSelectValue
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setState({ ...state, error: '' });
        db.collection("users").doc(email).set({
            nom: lname,
            prenom: fname,
            email,
            role,
            classe: selectValue,
            status: "absent",
            profilepic: false,
            telephone: ""
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                //Traduit l'erreur
                if (translateError(error.code).length > 0) {
                    //Affichage erreur traduite a l'utilisateur
                    setState({ error: translateError(error.code) });
                } else {
                    //Affichage erreur dans la console si cela ne peut pas etre traduit
                    console.log(error);
                }
            });
    }

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    return (
        <SelectContext.Provider value={SelectContextValue}>
            <RadioButtonContext.Provider value={RbContextValue}>
                <div className="createUser">
                    <form className="createUserForm" onSubmit={handleSubmit}>
                        <Forms onChange={handleChange} />
                        <RadioButtons />
                        {selectClasse
                            ? <Select />
                            : <></>
                        }
                        {error ? <p>{error}</p> : null}
                        <button className="submitBtn" type="submit">Ajouter</button>
                    </form>
                </div>
            </RadioButtonContext.Provider>
        </SelectContext.Provider>
    )
}
export default CreateUser