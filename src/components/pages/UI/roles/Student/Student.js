import React, { Component } from "react";
import { auth, db } from "../../../../../scripts/services/firebase";
import TableChartIcon from '@material-ui/icons/TableChart';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import "./Student.css"
import DayTimeTable from "../../../../DayTimeTable";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import StudentContact from './StudentContact'
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

class Student extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = auth()
    this.state = {
      loading: true,
      user: currentUser,
      userClass: "",
      nextAppointmentDate: [],
      nextAppointment: {},
      todayAppointments: [],
      showDayTable: false,
      showContact: false,
      isBtnDisable: false,
    }
    this.initAppointments = this.initAppointments.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.initContact = this.initContact.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    if (this.state.loading) {
      document.body.style.background = "#F4F7F6";
      const { currentUser } = auth()
      this.setState({
        ...this.state,
        user: currentUser
      })
      if (currentUser) this.initAppointments(currentUser)
      this.setState({
        ...this.state,
        loading: false
      })
    }

  }

  initAppointments = (user) => {
    db.collection("users").doc(user.uid).get().then((doc) => {
      db.collection("classes").doc(doc.data().classe).get().then((doc) => {
        this.setState({
          ...this.state,
          userClass: doc.id
        })
        const appointments = doc.data().appointments.map(appointment => {
          appointment.startDate = new Date(appointment.startDate.seconds * 1000)
          appointment.endDate = new Date(appointment.endDate.seconds * 1000)
          return appointment
        })
        const todayAppointments = appointments.filter(appointment => {
          let today = new Date();
          const tDd = String(today.getDate()).padStart(2, '0');
          const tMm = String(today.getMonth() + 1).padStart(2, '0');
          today = tDd + '/' + tMm;
          let appointmentDay = appointment.startDate
          const aDd = String(appointmentDay.getDate()).padStart(2, '0');
          const aMm = String(appointmentDay.getMonth() + 1).padStart(2, '0');
          appointmentDay = aDd + '/' + aMm;
          if (appointmentDay === "30/04") {
            return appointment
          }
        })

        this.setState({
          ...this.state,
          todayAppointments,
        })
        const nextAppointments = appointments.filter(appointment => {
          if (appointment.startDate > new Date()) {
            return appointment
          }
        })
        const courses = [];
        nextAppointments.forEach(appointment => {
          courses.push(appointment.startDate)
        });
        const goal = new Date();
        const nextAppointmentDate = courses.reduce(function (prev, curr) {
          return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });
        const nextAppointment = nextAppointments.filter(appointment => {
          if (appointment.startDate === nextAppointmentDate)
            return appointment
        })[0]
        const timeDiff = nextAppointmentDate.getTime() - new Date().getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
        let message = ""
        switch (true) {
          case (daysDiff === 0):
            message += "aujourd'hui à"
            break;
          case (daysDiff === 1):
            message += "demain à"
            break;

          default:
            const dd = String(nextAppointmentDate.getDate()).padStart(2, '0');
            const mm = String(nextAppointmentDate.getMonth() + 1).padStart(2, '0');
            const nextDate = dd + '/' + mm;
            message += `le ${nextDate} à`
            break;
        }
        let nextAppointmentTime = ""
        if (nextAppointmentDate.getMinutes() < 10) {
          nextAppointmentTime = `${nextAppointmentDate.getHours()}:0${nextAppointmentDate.getMinutes()}`
        } else {
          nextAppointmentTime = `${nextAppointmentDate.getHours()}:${nextAppointmentDate.getMinutes()}`
        }

        if (courses.length === 0) {
          this.setState({
            ...this.state,
            isBtnDisable: true,
            nextAppointmentDate: ["", ""],
            nextAppointment: { title: "Aucun cours", classe: "", location: "", notes: "" }
          })
        } else {
          this.setState({
            ...this.state,
            nextAppointmentDate: [nextAppointmentTime, message],
            nextAppointment,
          })

        }
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      ...this.state,
      submitSnackbar: false,
    })
  };
  handleClick() {
    this.setState({
      ...this.state,
      showDayTable: !this.state.showDayTable,
    })
  }
  initContact() {
    this.setState({
      ...this.state,
      showContact: !this.state.showContact,
    })
  }
  render() {
    const { classes } = this.props;
    const nextCourseInfosStudent =
      <div className="nextCourseInfosCtnr">
        <div className="nextCourseInfos">
          <h2><b>{this.state.nextAppointment.title}</b> {this.state.nextAppointmentDate[1]} {this.state.nextAppointmentDate[0]}</h2>
          <p>Formateur : <b>{this.state.nextAppointment.formateur}</b></p>
          <p>Salle : <b>{this.state.nextAppointment.location}</b></p>
          <p>Informations : <b>{this.state.nextAppointment.notes}</b></p>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<TableChartIcon />}
            onClick={this.handleClick}
          // disabled={this.state.isBtnDisable}
          >
            Vos cours de la journée
        </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<AnnouncementIcon />}
            onClick={this.initContact}
          // disabled={this.state.isBtnDisable}
          >
            Signaler un retard/absence
        </Button>
        </div>
      </div>

    return (
      <div className="studentPanel">
        {this.state.loading === false && this.state.user && <h1>Bonjour, {this.state.user.displayName}</h1>}

        <p>Votre prochain cours : </p>
        {nextCourseInfosStudent}
        {this.state.showContact
          ? <Fade in={this.state.showContact}>
            <StudentContact submit={this.handleClick} user={this.state.user} userClass={this.state.userClass} initContact={this.initContact} todayAppointments={this.state.todayAppointments} nextAppointment={this.state.nextAppointment} />
          </Fade>
          : null}
        {this.state.showDayTable
          ? <div className={classes.container}>
            <Fade in={this.state.showDayTable}>
              <Paper elevation={4} className={classes.paper}>
                <div className="overlayTb" onClick={this.handleClick}>
                </div>
                <div className="dayTimeTableCtnr">
                  <div className="dayTbBtn">
                    <IconButton aria-label="delete" color="primary" onClick={this.handleClick}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                  <DayTimeTable appointments={this.state.todayAppointments} />
                </div>
              </Paper>
            </Fade>
          </div>
          : null}
      </div>
    )
  }
}

export default withStyles(styles)(Student)