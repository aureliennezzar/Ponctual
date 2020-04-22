import * as React from 'react';
import {
    Appointments,
    AppointmentTooltip,
    Scheduler,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
// import appointments from './demo-data/today-appointments';
import moment from 'moment';
import { appointments } from './demo-data/appointments';
import { db } from '../../../../scripts/services/firebase'



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

export default class TimeTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            appointmentMeta: {
                target: null,
                data: {},
            },
            idClass: props.match.params.id,
            wrongId: false
        };
        this.toggleVisibility = () => {
            const { visible: tooltipVisibility } = this.state;
            this.setState({ visible: !tooltipVisibility });
        };
        this.onAppointmentMetaChange = ({ data, target }) => {
            this.setState({ appointmentMeta: { data, target } });
        };
        this.myAppointment = this.myAppointment.bind(this);
    }
    componentDidMount() {
        db.collection("classes").doc(this.props.match.params.id).get().then((doc) => {
            if (doc.exists) {
                let appointments = []
                doc.data().appointments.forEach(appointment => {
                    let { title, startDate, endDate, id, location } = appointment
                    let sDate = new Date(startDate.seconds * 1000)
                    let eDate = new Date(endDate.seconds * 1000)
                    appointments.push({ title, startDate: sDate, endDate: eDate, id, location })
                });

                const currentDate = moment();
                let date = currentDate.date();

                const makeTodayAppointment = (startDate, endDate) => {
                    const days = moment(startDate).diff(endDate, 'days');
                    const nextStartDate = moment(startDate)
                        .year(currentDate.year())
                        .month(currentDate.month())
                        .date(date);
                    const nextEndDate = moment(endDate)
                        .year(currentDate.year())
                        .month(currentDate.month())
                        .date(date + days);

                    return {
                        startDate: nextStartDate.toDate(),
                        endDate: nextEndDate.toDate(),
                    };
                };
                const tab = appointments.map(({ startDate, endDate, ...restArgs }) => {
                    const result = {
                        ...makeTodayAppointment(startDate, endDate),
                        ...restArgs,
                    };
                    date += 1;
                    if (date > 31) date = 1;
                    return result;
                });
                this.setState({
                    ...this.state,
                    data: tab
                })
            } else {
                // doc.data() will be undefined in this case
                this.setState({
                    ...this.state,
                    wrongId: true
                })
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        console.log("mounted", this.props.match.params.id)
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
        } = this.state;

        return (
            <>
                {this.state.wrongId
                    ? <div>
                        <h2>Erreur ! Cette page n'existe pas ! </h2>
                    </div>
                    : <Paper>
                        <Scheduler
                            data={data}
                            height={660}
                        >
                            <WeekView
                                startDayHour={9}
                                endDayHour={19}
                            />

                            <Appointments
                                appointmentComponent={this.myAppointment}
                            />

                            <AppointmentTooltip
                                showCloseButton
                                visible={visible}
                                onVisibilityChange={this.toggleVisibility}
                                appointmentMeta={appointmentMeta}
                                onAppointmentMetaChange={this.onAppointmentMetaChange}
                            />
                        </Scheduler>
                    </Paper>
                }
            </>
        );
    }
}
