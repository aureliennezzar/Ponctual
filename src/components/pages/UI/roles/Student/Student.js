import React, { Component } from "react";
import { auth, db } from "../../../../../scripts/services/firebase";
import TableChartIcon from '@material-ui/icons/TableChart';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import "./Student.css"
import DayTimeTable from "../../../../DayTimeTable";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
});

class Student extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = auth()
    this.state = {
      loading: true,
      user: currentUser,
      nextAppointmentDate: [],
      nextAppointment: {},
      showDayTable: false,
    }
    this.initAppointments = this.initAppointments.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
          if (appointmentDay === today) {
            return appointment
          }
        })

        console.log(todayAppointments)
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
            message += "à"
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
        this.setState({
          ...this.state,
          nextAppointmentDate: [nextAppointmentDate.getHours(), message],
          nextAppointment,
          todayAppointments,
        })
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
  handleClick() {
    this.setState({
      ...this.state,
      showDayTable: true,
    })
  }
  render() {

    const { classes } = this.props;
    const nextCourseInfosStudent =
      <div className="nextCourseInfosStudent">
        <p>Infos du cours : {this.state.nextAppointment.title}</p>
        <p>Formateur : {this.state.nextAppointment.formateur}</p>
        <p>Salle : {this.state.nextAppointment.location}</p>
        <p>Informations : {this.state.nextAppointment.notes}</p>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<TableChartIcon />}
          onClick={this.handleClick}
        >
          Vos cours de la journée
      </Button>
      </div>
    return (
      <div className="studentPanel">
        {this.state.loading === false && this.state.user && <h1>Bonjour, {this.state.user.displayName}</h1>}
        <div className="nextCourseStudent">
          <p>Votre prochain cours commence {this.state.nextAppointmentDate[1]} {this.state.nextAppointmentDate[0]} H</p>
          {nextCourseInfosStudent}
        </div>
        {this.state.showDayTable
          ? <DayTimeTable appointments={this.state.todayAppointments} />
          : null}
      </div>
    )
  }
}

export default withStyles(styles)(Student);