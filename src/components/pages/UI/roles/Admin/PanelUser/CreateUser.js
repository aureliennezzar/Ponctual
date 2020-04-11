import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import RadioButtons from "./RadioButtons";
import RadioButtonContext from "../Contexts/RadioButtonContext";
import SelectContext from "../Contexts/SelectContext";
import Select from "./Select";
import Forms from "./Forms";
import { signup } from "../../../../../../scripts/auth";
import "./CreateUser.css"

const CreateUser = props => {
    const { updateOption, updateComp } = useContext(RadioButtonContext);
    const [selectClasse, setSelectClasse] = useState(true)
    const [selectValue, setSelectValue] = useState("default")
    const [role, setRole] = useState(null)
    const [state, setState] = useState({
        lname: "",
        fname: "",
        email: "",
        password: null,
        error: ""
    })
    const { lname, fname, email } = state;

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
        setState({
            lname: "",
            fname: "",
            email: ""
        })
        signup(email, lname, fname, role, selectValue);

    }

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    const handleClick = (event) => {
        props.setUserCreation(false)
    }
    return (

        <SelectContext.Provider value={SelectContextValue}>
            <RadioButtonContext.Provider value={RbContextValue}>
                <div className="createUser">
    
                    <form className="createUserForm" onSubmit={handleSubmit}>
                    
                        <Forms onChange={handleChange} value={state} />
                        <div className="divBtn"><FontAwesomeIcon className="delBtn" icon={faTimes} size="1x" onClick={handleClick} /></div>
                        <div className="bottomForm"> <RadioButtons /> 
                        {selectClasse
                            ? <Select />
                            : <></>
                        }
                        </div>

                        <button className="submitBtn" type="submit" >Ajouter</button>
                        
                    </form>
                </div>
                <div className="overlay" onClick={handleClick}></div>
            </RadioButtonContext.Provider>
        </SelectContext.Provider>


    )
}
export default CreateUser