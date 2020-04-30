import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import '../Student/StudentContact.css'
import { db } from "../../../../../scripts/services/firebase";
import firebase from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = (theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
});
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function valuetext(value) {
    return `${value} min`;
}
class CreateHomeWork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radioValue: "retard",
            raison: "",
            sliderValue: [5],
            submitSnackbar: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCb = this.handleChangeCb.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeTf = this.handleChangeTf.bind(this)
        this.handleChangeSlider = this.handleChangeSlider.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }
    componentDidMount() {
        this.props.todayAppointments.forEach(appointment => {
            const keyName = Math.round(appointment.startDate.getTime() / 1000);
            this.setState({
                ...this.state,
                [keyName]: false
            })
        });
        db.collection('classes').doc(this.props.userClass).get().then((doc) => {

            db.collection("users").where("nom", "==", doc.data().formateur.split(' ')[0])
                .where("prenom", "==", doc.data().formateur.split(' ')[1])
                .where("role", "==", "teacher")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.setState({
                            ...this.state,
                            actualTeacher: doc.id
                        })
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.radioValue === "absence") {
            const newMessages = []
            this.props.todayAppointments.forEach(appointment => {
                const keyName = Math.round(appointment.startDate.getTime() / 1000);
                if (this.state[keyName]) {
                    newMessages.push({ studentName: this.props.user.displayName, appointment, type: ["absence"], message: this.state.raison })
                }
            });
            newMessages.forEach(message => {
                db.collection("users").where("nom", "==", message.appointment.formateur.split(' ')[0])
                    .where("prenom", "==", message.appointment.formateur.split(' ')[1])
                    .where("role", "==", "teacher")
                    .get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.data())
                            db.collection('users').doc(doc.id).update({
                                studentsMessages: firebase.firestore.FieldValue.arrayUnion(message)
                            })
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            });
        } else {
            const newMessage = { studentName: this.props.user.displayName, appointment: this.props.nextAppointment, type: ["retard", this.state.sliderValue], message: this.state.raison }
            console.log(newMessage)
            db.collection('users').doc(this.state.actualTeacher).update({
                studentsMessages: firebase.firestore.FieldValue.arrayUnion(newMessage)
            })
        }
        this.setState({
            ...this.state,
            submitSnackbar: true,
            raison: "",
            radioValue: "retard"
        })
        // this.props.initContact()
    }
    handleChange(event) {
        this.setState({
            ...this.state,
            radioValue: event.target.value
        });
    };
    handleChangeTf(event) {
        this.setState({ ...this.state, raison: event.target.value });
    };
    handleChangeSlider(event, value) {
        this.setState({ ...this.state, sliderValue: value });
    };
    handleChangeCb(event, checked) {
        this.setState({ ...this.state, [event.target.name]: checked });
    };
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            ...this.state,
            submitSnackbar: false,
        })
    };

    render() {

        const submitSnackbar = <div>
            <Snackbar open={this.state.submitSnackbar} autoHideDuration={2000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                    Le message à bien été envoyé !
    </Alert>
            </Snackbar>
        </div>
        return (
            <div className="contactPanel">
                <div className="overlayContact" onClick={this.props.initContact}>
                </div>
                <div className="contactPanelCtnr">
                    <h4>Signaler un retard ou une absence</h4>
                    <div className="contactPanelBtn">
                        <IconButton aria-label="delete" color="primary" onClick={this.props.initContact}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    <form className="studentContactForm" onSubmit={this.handleSubmit}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Choisir une option</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={this.state.radioValue} onChange={this.handleChange}>
                                <FormControlLabel value="retard" control={<Radio />} label="Retard" />
                                {this.state.radioValue === "retard"
                                    ? <>
                                        <Typography id="discrete-slider" gutterBottom>
                                            Minutes de retard
                                        </Typography>
                                        <Slider
                                            defaultValue={5}
                                            onChange={this.handleChangeSlider}
                                            getAriaValueText={valuetext}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={5}
                                            marks
                                            min={5}
                                            max={30}
                                        />
                                    </>
                                    : null}

                                <FormControlLabel value="absence" control={<Radio />} label="Absence" />
                                {this.state.radioValue === "absence"
                                    ? <>
                                        <Typography id="discrete-slider" gutterBottom>
                                            Quels cours ?
                                        </Typography>
                                        {this.props.todayAppointments.map(appointment => {
                                            const keyName = Math.round(appointment.startDate.getTime() / 1000);
                                            const apStartDate = appointment.startDate
                                            const apEndDate = appointment.endDate

                                            const hours = [apStartDate.getHours(), apEndDate.getHours()]
                                            const minutes = [('0' + apStartDate.getMinutes()).slice(-2), ('0' + apEndDate.getMinutes()).slice(-2)]
                                            const time = `${hours[0]}:${minutes[0]} - ${hours[1]}:${minutes[1]}`
                                            return <FormControlLabel key={keyName}
                                                control={<Checkbox checked={this.state[keyName]} onChange={this.handleChangeCb} name={keyName.toString()} />}
                                                label={`${appointment.title} ${time}`}
                                            />
                                        })}
                                    </>
                                    : null}
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            id="outlined-textarea"
                            style={{ paddingBottom: "75px", marginTop: "20px" }}
                            value={this.state.raison}
                            onChange={this.handleChangeTf}
                            label="Raison"
                            placeholder="Ecrire ici"
                            multiline
                            variant="outlined"
                            rowsMax={10}
                        />
                        <div className="sc_submitBtnCtnr">
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                className="sc_submitBtn"
                                type="submit"
                            >
                                Envoyer
                      </Button>
                        </div>
                    </form>
                </div>
                {submitSnackbar}
            </div>
        )
    }
}

export default withStyles(styles)(CreateHomeWork)