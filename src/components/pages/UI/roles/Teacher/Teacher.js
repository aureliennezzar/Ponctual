import React, { Component } from "react";
import { auth, db } from "../../../../../scripts/services/firebase";
import { withStyles } from '@material-ui/core/styles';
import TableChartIcon from '@material-ui/icons/TableChart';
import Button from '@material-ui/core/Button';
import DayTimeTable from "../../../../DayTimeTable";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import "./Teacher.css"
import { Redirect } from "react-router-dom";
import history from "../../../../history";
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
class Teacher extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = auth()
    this.state = {
      loading: true,
      user: currentUser,
      nextAppointmentDate: [],
      nextAppointment: {},
      actualAppointment: {},
      showDayTable: false,
      showCallRoll: false,
      isCrDisable: false,
      isNaDisable:false,
    }
    this.initAppointments = this.initAppointments.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.initRollCall = this.initRollCall.bind(this)

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
    const todayDate = new Date()
    console.log(todayDate)

    db.collection("users").doc(user.uid).get().then((doc) => {
      const tab = Object.values(doc.data().appointments)
      let allClassesAppointments = []
      tab.forEach(classe => {
        allClassesAppointments.push(...classe)
      })

      const appointments = allClassesAppointments.map(appointment => {
        appointment.startDate = new Date(appointment.startDate.seconds * 1000)
        appointment.endDate = new Date(appointment.endDate.seconds * 1000)
        return appointment
      })
      const todayAppointments = appointments.filter(appointment => {
        const tDd = String(todayDate.getDate()).padStart(2, '0');
        const tMm = String(todayDate.getMonth() + 1).padStart(2, '0');
        const today = tDd + '/' + tMm;
        let appointmentDay = appointment.startDate
        const aDd = String(appointmentDay.getDate()).padStart(2, '0');
        const aMm = String(appointmentDay.getMonth() + 1).padStart(2, '0');
        appointmentDay = aDd + '/' + aMm;
        if (appointmentDay === today) {
          return appointment
        }
      })
      const actualAppointment = todayAppointments.filter(appointment => {
        if (appointment.startDate <= todayDate && appointment.endDate >= todayDate) {
          return appointment
        }
      })[0]
      if (actualAppointment === undefined) {
        this.setState({
          ...this.state,
          isCrDisable: true,
          actualAppointment: { title: "Aucun cours", classe: "", location: "", notes: "" }
        })
      } else {
        this.setState({
          ...this.state,
          actualAppointment,
        })
      }
      const nextAppointments = appointments.filter(appointment => {
        if (appointment.startDate > todayDate) {
          return appointment
        }
      })

      const courses = [];
      nextAppointments.forEach(appointment => {
        courses.push(appointment.startDate)
      });
      if (courses.length === 0) {
        this.setState({
          ...this.state,
          isNaDisable:true,
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
      const goal = todayDate;
      const nextAppointmentDate = courses.reduce(function (prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });
      const nextAppointment = nextAppointments.filter(appointment => {
        if (appointment.startDate === nextAppointmentDate)
          return appointment
      })[0]

      const timeDiff = nextAppointmentDate.getTime() - todayDate.getTime();
      const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24))
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



      this.setState({
        ...this.state,
        todayAppointments,
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
  handleClick() {
    this.setState({
      ...this.state,
      showDayTable: !this.state.showDayTable,
    })
  }
  initRollCall() {
    this.setState({
      ...this.state,
      showCallRoll: !this.state.showCallRoll,
    })
  }
  render() {

    const { classes } = this.props;

    const nextCourseInfosStudent =

      <div>
        <p>Votre prochain cours: </p>
        <div className="nextCourseInfosCtnr">
          <div className="nextCourseInfos">
            <h2><b>{this.state.nextAppointment.title}</b> {this.state.nextAppointmentDate[1]} {this.state.nextAppointmentDate[0]}</h2>
            <p>Classe : <b>{this.state.nextAppointment.classe}</b></p>
            <p>Salle : <b>{this.state.nextAppointment.location}</b></p>
            <p>Informations : <b>{this.state.nextAppointment.notes}</b></p>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<TableChartIcon />}
              onClick={this.handleClick}
              disabled={this.state.isNaDisable}>
              Vos cours de la journée
        </Button>
          </div>
        </div>
      </div>

    const actualCourseInfosStudent =
      <div style={{ paddingRight: "100px" }}>
        <p>Cours actuel : </p>
        <div className="nextCourseInfosCtnr">
          <div className="nextCourseInfos">
            <h2><b>{this.state.actualAppointment.title}</b></h2>
            <p>Classe : <b>{this.state.actualAppointment.classe}</b></p>
            <p>Salle : <b>{this.state.actualAppointment.location}</b></p>
            <p>Informations : <b>{this.state.actualAppointment.notes}</b></p>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<BeenhereIcon />}
              onClick={this.initRollCall}
              disabled={this.state.isCrDisable}
            >
              Faire l'appel
        </Button>
          </div>
        </div>
      </div>
    return (
      <div className="teacherPanel">
        {this.state.loading === false && this.state.user && <h1>Bonjour, {this.state.user.displayName}</h1>}

        <div style={{ display: "flex" }}>
          {actualCourseInfosStudent}
          {nextCourseInfosStudent}</div>
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
        {this.state.showCallRoll
          ? <Redirect to={{
            pathname: '/appel',
            state: {
              actualAppointment: this.state.actualAppointment,
              teacherUid: auth().currentUser.uid,
            }
          }}>
            {history.push("/appel")}
          </Redirect>
          : null}

      </div>
    )
  }
}

export default withStyles(styles)(Teacher)