import * as React from 'react';
import {
    Appointments,
    AppointmentTooltip,
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import { auth, db } from "../../../../scripts/services/firebase";
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import Nav from '../../../Nav'

const styles = theme => ({
    button: {
        color: theme.palette.background.default,
        padding: 0,
    },
    text: {
        paddingTop: theme.spacing(1),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});
const style = ({ palette }) => ({
    icon: {
        color: palette.action.active,
    },
    textCenter: {
        textAlign: 'center',
    },
    header: {
        height: '260px',
        backgroundSize: 'cover',
    },
    commandButton: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
});

const AppointmentBase = ({
    children,
    data,
    onClick,
    classes,
    toggleVisibility,
    onAppointmentMetaChange,
    ...restProps
}) => (
        <Appointments.Appointment
            {...restProps}
        >
            <React.Fragment>
                <IconButton
                    className={classes.button}
                    onClick={({ target }) => {
                        toggleVisibility();
                        onAppointmentMetaChange({ target: target.parentElement.parentElement, data });
                    }}
                >
                    <InfoIcon fontSize="small" />
                </IconButton>
                {children}
            </React.Fragment>
        </Appointments.Appointment>
    );

const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);

const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
}) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid item xs={2} className={classes.textCenter}>
                    <Room className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>{appointmentData.location}</span>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={2} className={classes.textCenter}>
                    <InfoIcon className={classes.icon} />
                </Grid>
                <Grid item xs={10}>
                    <span>{appointmentData.notes}</span>
                </Grid>
            </Grid>
        </AppointmentTooltip.Content>
    ));


export default class TimeTable extends React.PureComponent {
    constructor(props) {
        super(props);
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        this.state = {
            data: [],
            visible: false,
            appointmentMeta: {
                target: null,
                data: {},
            },
            currentDate: today,
            collectionRef: ["", ""],
        };

        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };

        this.toggleVisibility = () => {
            const { visible: tooltipVisibility } = this.state;
            this.setState({ visible: !tooltipVisibility });
        };
        this.onAppointmentMetaChange = ({ data, target }) => {
            this.setState({ appointmentMeta: { data, target } });
        };
        this.myAppointment = this.myAppointment.bind(this);
        this.initAppointmentsStudent = this.initAppointmentsStudent.bind(this);
        this.initAppointmentsTeacher = this.initAppointmentsTeacher.bind(this);
    }
    componentDidMount() {
        if (this.props.userInfo.role !== "teacher") {
            this.initAppointmentsStudent()
        } else {
            this.initAppointmentsTeacher()
        }
    }
    initAppointmentsStudent() {
        const { classe } = this.props.userInfo
        db.collection("classes").doc(classe).get().then((doc) => {
            if (doc.exists) {
                let appointments = []
                doc.data().appointments.forEach(appointment => {
                    let { title, startDate, endDate, id, location, notes, formateur, classe } = appointment
                    let sDate = new Date(startDate.seconds * 1000)
                    let eDate = new Date(endDate.seconds * 1000)
                    appointments.push({ title, startDate: sDate, endDate: eDate, id, location, notes, formateur, classe })
                });

                this.setState({
                    ...this.state,
                    data: appointments
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    initAppointmentsTeacher() {
        const { uid } = auth().currentUser;
        db.collection("users").doc(uid).get().then((doc) => {
            if (doc.exists) {
                const tab = Object.values(doc.data().appointments)
                let appointments = []
                tab.forEach(classe => {
                    appointments.push(...classe)
                })
                let data = []
                appointments.forEach(appointment => {
                    let { title, startDate, endDate, id, location, notes, formateur, classe } = appointment
                    let sDate = new Date(startDate.seconds * 1000)
                    let eDate = new Date(endDate.seconds * 1000)
                    data.push({ title, startDate: sDate, endDate: eDate, id, location, notes, formateur, classe })
                });

                this.setState({
                    ...this.state,
                    data
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    myAppointment(props) {
        return (
            <Appointment
                {...props}
                toggleVisibility={this.toggleVisibility}
                onAppointmentMetaChange={this.onAppointmentMetaChange}
            />
        );
    }

    render() {
        const {
            data,
            appointmentMeta,
            visible,
            currentDate,
        } = this.state;
        const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({
            classes, data, formatDate, ...restProps
        }) => (
                <Appointments.AppointmentContent {...restProps} formatDate={formatDate} data={data}>
                    <div className={classes.container}>
                        <div className={classes.title}>
                            <b>{data.title}</b>
                        </div>
                        <div className={classes.text}>
                            Salle : {data.location}
                        </div>

                        <div className={classes.text}>
                            {this.props.userInfo.role !== "teacher"
                                ? <>Formateur : <br></br>{data.formateur.split(' ')[0]}</>
                                : <>Classe : <br></br>{data.classe}</>
                            }
                        </div>

                    </div>
                </Appointments.AppointmentContent>
            ));
        return (
            <>
                <Nav userInfo={this.props.userInfo} />

                <div style={{ position: "fixed", top: 60 }}>
                    <Paper>
                        <Scheduler
                            data={data}
                            height={"auto"}
                            firstDayOfWeek={1}
                            locale={'fr-FR'}
                        >
                            <ViewState
                                currentDate={currentDate}
                                onCurrentDateChange={this.currentDateChange}
                            />
                            <WeekView
                                startDayHour={8}
                                endDayHour={18}
                                cellDuration={60}
                            />

                            <Appointments
                                appointmentContentComponent={AppointmentContent}
                            />

                            <AppointmentTooltip
                                showCloseButton
                                visible={visible}
                                contentComponent={Content}
                                onVisibilityChange={this.toggleVisibility}
                                appointmentMeta={appointmentMeta}
                                onAppointmentMetaChange={this.onAppointmentMetaChange}
                            />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton messages={{ today: "Aujourd'hui" }} />
                        </Scheduler>
                    </Paper>
                </div>
            </>
        );
    }
}
