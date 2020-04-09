import React, { useState, useEffect, useContext } from "react";
import RadioButtonContext from "../Contexts/RadioButtonContext"
import SelectContext from "../Contexts/SelectContext"

const RadioButtons = () => {
    const [selectedOption, setSelectedOption] = useState('student');
    const { updateOption, updateComp } = useContext(RadioButtonContext);
    const { updateSelectValue } = useContext(SelectContext);

    const handleOptionChange = (event) => {
        const { value } = event.target
        setSelectedOption(value);
        updateOption(value)
        if (value === "student") {
            updateComp(true)
        } else {
            updateSelectValue("default")
            updateComp(false)
        }
    }
    useEffect(() => {
        updateComp(true)
        updateOption(selectedOption)
    }, [])
    return (
        <div>
            <p>Role</p>

            <div className="radio">
                <label>
                    <input type="radio" value="student"
                        checked={selectedOption === 'student'}
                        onChange={handleOptionChange} />
        Eleve
      </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="teacher"
                        checked={selectedOption === 'teacher'}
                        onChange={handleOptionChange} />
        Formateur
      </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="admin"
                        checked={selectedOption === 'admin'}
                        onChange={handleOptionChange} />
        Admin
      </label>
            </div>

        </div>

    )
}

export default RadioButtons;