import React, { useState, useEffect } from 'react';
import UserStat from "./UserStat"
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
import CancelIcon from '@material-ui/icons/Cancel';
import { Redirect } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(2),
    },
    textField: {
        width: '20ch',
    },
}));

const Profile = props => {
    const { userInfo } = props
    const [state, setState] = useState({
        redirect: false,
        displayName: "Nom indéfini",
        email: "",
        role: "",
        resetPassword: false
    })
    const [photoURL, setPhotoURL] = useState(<AccountCircleIcon style={{ height: 150, width: 150 }} />)

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        currentPassword: '',
        showCurrentPassword: false,
        showChangePassword: true,

    });

    const [data, setData] = useState({
        dataset: [{ value: 0, label: "retards" }, { value: 0, label: "absences" }, { value: 0, label: "presences" }],
        colors: ['orange', 'red', 'green']
    })
    const { pathname } = props.location
    const path = pathname.split('/')
    const setDataStudent = (user) => {
        console.log(user)

        var docRef = db.collection("users").doc(user);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                setState({
                    ...state,
                    displayName: `${doc.data().nom} ${doc.data().prenom}`,
                    email: doc.data().email,
                    role: doc.data().role,
                   
                })
                setData({
                    ...data,
                    dataset: [{ value: doc.data().retards.length, label: "retard" }, { value: doc.data().absences.length, label: "absences" }, { value: doc.data().presences, label: "presences" }]
                })

            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }

    const setPhoto = (user) => {
        console.log(user)
        storageRef.child(user).listAll().then(function (res) {
            console.log(res)
            res.items.forEach(function (itemRef) {
                itemRef.getDownloadURL().then((url) => {
                    console.log(url)
                    setPhotoURL(
                       
                        <img className="resize" src={url} style={{ borderRadius: "50%", height: 150, width: 150 }} />,
                    )
                }).catch(function (error) {
                });
            });
        }).catch(function (error) {
        });
    }
    useEffect(
        () => {
            if (path.length > 2 && userInfo.role === 'admin') {
                setDataStudent(path[2])
                setValues({
                    ...state,
                    showChangePassword: false
                })
                setPhoto(path[2])
                

            } else {
               const uid = auth().currentUser.uid
                setDataStudent(uid)
                setValues({
                    ...state,
                    showChangePassword: true
                })
     
                setPhoto(uid)
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

    console.log(state.displayName)
    const prenom = state.displayName.split(' ')[0]
    const nom = state.displayName.split(' ')[1]

  

    if (path.length > 2 && path[2] !== auth().currentUser.uid && userInfo.role !== "admin") {
        console.log(path)
        return <Redirect to={{ pathname: "/profile" }} />
    }

    return (
        <>
            <Nav userInfo={props.userInfo} />
            <div className="profilectnr">
                <div className="profileLeft">

                    <div className="userInfoCtnr">
                        {photoURL}
                        <p id='nom'>{`${prenom} ${nom}`}</p>

                        <div style={{ left: 0 }}><p> {`Email : ${state.email}`}</p><p>{`Rôle : ${state.role}`}</p></div>

                        {values.showChangePassword && <div style={{ display: "flex", flexDirection: "column", width: "90%", alignItems: "center" }}>
                            {state.resetPassword === false ? <Button style={{ width: "50%" }} onClick={() => setState({ ...state, resetPassword: !state.resetPassword })}>Réinitialiser mot de passe</Button> : null}
                            {state.resetPassword && <div style={{ display: "flex", justifyContent: "center", width: "95%", alignItems: "center" }}>
                                <Button onClick={() => setState({ ...state, resetPassword: false })} style={{ height: 48, width: 40 }}><CancelIcon /></Button>
                                <FormControl
                                    className={clsx(classes.margin, classes.textField)}
                                    variant="filled"
                                    size="small"
                                >
                                    <InputLabel style={{ fontSize: "10px" }} htmlFor="filled-adornment-password">Ancien mot de passe</InputLabel>
                                    <FilledInput
                                        size="small"
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
                                    size="small"

                                >
                                    <InputLabel style={{ fontSize: "10px" }} htmlFor="filled-adornment-password">Nouveau mot de passe</InputLabel>
                                    <FilledInput
                                        size="small"
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
                                <Button onClick={updatePassword} style={{ height: 48, width: 40 }}><SendIcon /></Button>
                            </div>}
                        </div>}
                    </div>

                </div>

                {userInfo.role === 'student' || path.length > 2 ?
                    <div className='profileRight'>
                        <div className="chartCtnr">
                            <div className="pieChart">
                                <h3>Taux de retards/absences</h3>
                                <UserStat
                                    data={data}
                                    width={200}
                                    height={200}
                                    innerRadius={60}
                                    outerRadius={100}
                                />
                            </div>
                           
                        </div>
                    </div>
                    : null}

            </div>
        </>
    )
}


export default Profile