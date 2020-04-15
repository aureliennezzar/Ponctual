import React, { useState } from 'react';
import { db } from '../../../../../../scripts/services/firebase'
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        '& input': {
            width: '30%',
            height: '100%',

        },
        '& button': {

        }
    }
}));

const ClassAdd = (props) => {
    const { setClassAddComponent } = props
    const [state, setState] = useState({
        nom: '',
        formateur: '',
    })
    const { nom, formateur }= state
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        db.collection("classes").add({
            nom,
            formateur,
            status:0,
            eleves:[]
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        setClassAddComponent(false)
    }
    const handleCancel = () => {
        setClassAddComponent(false)
        setState({
            nom: '',
            formateur: ''
        })
    }
    const classes = useStyles();
    return (
        <div className="inputsAddClass">
            <div className="hider">
                <form className="classAddForm" onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <TextField className="classAddInputs" id="outlined-basic" label="Nom" variant="outlined" size="small" name="nom" onChange={handleChange} value={nom} />
                        <TextField className="classAddInputs" id="outlined-basic2" label="Formateur" variant="outlined" size="small" name="formateur" onChange={handleChange} value={formateur} />
                        <div style={{ display: "flex" }}>
                            <IconButton aria-label="Créer" type="submit">
                                <CheckIcon />
                            </IconButton>
                            <IconButton aria-label="Annuler" onClick={handleCancel}>
                                <ClearIcon />
                            </IconButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ClassAdd;