import React from "react";
const Forms = ({ onChange }) => {
    return (
        <>
            <div className="form-np">
                <div>
                    <label htmlFor="lname">Nom </label>
                    <label htmlFor="fname">Prénom</label>
                </div>
                <div>
                    <input type="text" name="lname" id="lname" placeholder="Entrer nom" onChange={onChange} required />
                    <input type="text" name="fname" id="fname" placeholder="Entrer Prénom" onChange={onChange} required />
                </div>
            </div>

            <div className="form">
                <label htmlFor="name">Email </label>
                <div>
                    <input type="email" name="email" id="email" placeholder="Entrer email" onChange={onChange} required />
                </div>
            </div>
        </>
    )
}

export default Forms