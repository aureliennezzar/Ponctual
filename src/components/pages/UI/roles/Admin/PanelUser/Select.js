import React, { useState, useContext } from 'react';
import SelectContext from "../Contexts/SelectContext";


const Select = () => {
    const [selectValue, setSelectValue] = useState("default");
    const { updateSelectValue } = useContext(SelectContext);
    const handleChange = (e) => {
        const { value } = e.target
        setSelectValue(value)
        updateSelectValue(value)
    }

    return (
        <div className="formfield-select">
            
            <div className="selectClassContainer">
                <select id="mySelect"
                    value={selectValue}
                    onChange={handleChange} >
                    <option value="default">Selectionner une classe</option>
                    <option value="prepa-a">Prepa A</option>
                    <option value="prepa-b">Prepa B</option>
                    <option value="prepa-b">Prepa B</option>
                    <option value="prepa-b">Prepa B</option>
                    <option value="prepa-b">Prepa B</option>
                    <option value="prepa-b">Prepa B</option>
                </select>
            </div>
        </div>
    )
}

export default Select;