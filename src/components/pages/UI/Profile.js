import React, { useState, useEffect } from 'react';
import UserStat from "./UserStat"
import LineChart from "./LineChart"
import Nav from "../../../components/Nav"
import firebase from 'firebase'
import { auth, db, storageRef } from "../../../scripts/services/firebase";
import "./Profile.css"
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const Profile = props => {
    const { userInfo } = props
    const [state, setState] = useState({
        displayName: "",
        email: "",
        role: "",
        photoURL: <AccountCircleIcon style={{ height: 150, width: 150 }} />,
        resetPassword: false
    })

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        currentPassword: '',
        showCurrentPassword: false,

    });

    const [data, setData] = useState({
        dataset: [{ value: 0, label: "retards" }, { value: 0, label: "absences" }, { value: 0, label: "presences" }],
        colors: ['orange', 'red', 'green']
    })
    const setDataStudent = (user) => {

        var docRef = db.collection("users").doc(user.uid);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                setData({
                    ...data,
                    dataset: [{ value: doc.data().retards.length, label: "retard" }, { value: doc.data().absences.length, label: "absences" }, { value: doc.data().presences, label: "presences" }]
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    useEffect(
        () => {

            const user = auth().currentUser;
            if (userInfo.role === "student") setDataStudent(user)
            const { displayName, email } = user
            if (user) {

                setState({
                    ...state,
                    displayName,
                    email,
                    role: userInfo.role,
                })
                storageRef.child(user.uid).listAll().then(function (res) {
                    res.items.forEach(function (itemRef) {
                        itemRef.getDownloadURL().then((url) => {
                            setState({
                                ...state,
                                displayName,
                                email,
                                role: userInfo.role,
                                photoURL: <img className="resize" src={url} style={{ borderRadius: "50%", height: 150, width: 150 }} />,
                            })

                        }).catch(function (error) {
                        });
                    });
                }).catch(function (error) {
                });
            }
        }, [!data]);


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword, showCurrentPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
                setState({ ...state, resetPassword: false })
            }).catch((error) => { alert(error) });

        }).catch((error) => { alert(error); });
    }



    const updatePassword = () => {
        if (values.password.length > 8) {
            changePassword(values.currentPassword, values.password)
            setValues({ ...values, currentPassword: "", password: "" })
            setState({ ...state, resetPassword: false })
        }
    }
    const classes = useStyles();


    const prenom = state.displayName.split(' ')[0]
    const nom = state.displayName.split(' ')[1]
 
    const dataL = [
        { a: 1, b: 3 },
        { a: 2, b: 6 },
        { a: 3, b: 2 },
        { a: 4, b: 12 },
        { a: 5, b: 8 }
    ]
    return (
        <>
            <Nav userInfo={props.userInfo} />
            <div className="profilectnr">
                <div className="profileLeft">

                    <div className="userInfoCtnr">
                        {state.photoURL}
                        <p id='nom'>{`${prenom} ${nom}`}</p>

                        <div style={{ left: 0 }}><p> {`Email : ${state.email}`}</p><p>{`Rôle : ${state.role}`}</p></div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {state.resetPassword === false ? <Button onClick={() => setState({ ...state, resetPassword: !state.resetPassword })}>Réinitialiser mot de passe</Button> : null}
                            {state.resetPassword && <div style={{ display: "flex", justifyContent: "center" }}>
                                <FormControl
                                    className={clsx(classes.margin, classes.textField)}
                                    variant="filled"
                                >
                                    <InputLabel htmlFor="filled-adornment-password">Ancien mot de passe</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={values.showCurrentPassword ? "text" : "password"}
                                        value={values.currentPassword}
                                        onChange={handleChange("currentPassword")}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl
                                    className={clsx(classes.margin, classes.textField)}
                                    variant="filled"
                                >
                                    <InputLabel htmlFor="filled-adornment-password">Nouveau mot de passe</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={values.showPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Button onClick={updatePassword}><SendIcon /></Button>
                            </div>}

                        </div>
                    </div>

                </div>




                {userInfo.role === 'student' ?
                    <div className='profileRight'>
                        <div className="chartCtnr">
                            <div className="pieChart">
                                <UserStat
                                    data={data}
                                    width={200}
                                    height={200}
                                    innerRadius={60}
                                    outerRadius={100}
                                />
                            </div>
                            <div className="lineChart">
                                <LineChart data={dataL} width={500} height={350} margin={20} />
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        </>
    )
}


export default Profile