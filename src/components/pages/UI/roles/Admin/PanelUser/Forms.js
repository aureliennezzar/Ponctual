import React from "react";
const Forms = ({ onChange, value }) => {
    const { fname, lname, email } = value;
    return (


        <div className="form">
            <div className="ContainerInput">
                <div className="group">
                    <input  type="text" name="lname" className="InputsCustom" id="lname"  onChange={onChange} value={lname} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label" >Name</label>
                </div>
                <div className="group">
                    <input type="text" name="fname" id="fname" className="InputsCustom"  onChange={onChange} value={fname} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Prénom</label>
                </div>
                <div className="group">
                    <input type="email" name="email" id="email" className="InputsCustom"  onChange={onChange} value={email} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="label">Email</label>
                </div>
            </div>
        </div>

    )
}

export default Forms