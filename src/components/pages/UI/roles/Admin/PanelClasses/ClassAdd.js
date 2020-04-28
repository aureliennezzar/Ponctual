import React, { useState, useEffect } from 'react';
import { db } from '../../../../../../scripts/services/firebase'
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const ClassAdd = (props) => {

    const { setClassAddComponent, mode } = props
    const [formateurs, setFormateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        nom: '',
        formateur: '',
    })
    const { nom, formateur } = state
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            width: '100%',
            textAlign: 'center',
            justifyContent: "space-between",
            alignItems: "center",
            '& input': {
                width: 200,
                height: '100%',
            },
            '& > .select': {
                width: 200,
                height: '80%'
            }
        }
    }));

    const initFormateurs = () => {
        db.collection("users")
            .onSnapshot(function (querySnapshot) {
                const teachersTab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, prenom, role } = doc.data()
                    if (role === "teacher") teachersTab.push({ label: nom + ' ' + prenom })
                });
                setFormateurs(teachersTab);
                setLoading(false)
            });
    }
    useEffect(() => {
        if (loading) {
            if (mode !== "default") {
                const { nom, formateur } = mode[1]
                setState({
                    nom,
                    formateur
                })
            }
            initFormateurs();
        }
    });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const { uid } = mode[1]
        switch (mode[0]) {
            case "add":
                db.collection("classes").add({
                    nom: nom || "Aucun nom",
                    formateur: formateur || "Aucun formateur",
                    status: 0,
                    eleves: [],
                    appointments: []
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

                break;
            case "delete":
                db.collection("classes").doc(uid).delete()
                break;

            case "edit":
                db.collection("classes").doc(uid).update({
                    nom: nom || "Aucun nom",
                    formateur: formateur || "Aucun formateur",
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                break;

            default:
                break;
        }
        setClassAddComponent([false, "default"])
    }
    const handleCancel = () => {
        setClassAddComponent([false, "default"])
        setState({
            nom: '',
            formateur: ''
        })
    }
    const classes = useStyles();
    return (
        <div className="inputsAddClass">
            <div className="hider">
                <form className="classAddForm" onSubmit={handleSubmit} autoComplete="off">
                    <div className={classes.root}>
                        {mode[0] !== "delete" ?
                            <>
                                <TextField className="classAddInputs" id="outlined-basic" label="Nom" variant="outlined" size="small" name="nom" onChange={handleChange} value={nom} />
                                <TextField
                                    size="small"
                                    className="select"
                                    id="outlined-select-currency"
                                    name="formateur"
                                    select
                                    label="Formateur"
                                    value={state.formateur}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    {formateurs.map(option => (
                                        <MenuItem key={option.label} value={option.label}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </> : <h3 style={{color: "red"}}>Êtes-vous sur de vouloir supprimer cette classe ?</h3>
                        }

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