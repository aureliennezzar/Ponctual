import * as React from 'react';
import { db } from '../../../../scripts/services/firebase'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SchoolIcon from '@material-ui/icons/School';
import Nav from '../../../Nav'


const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      formateurs: [],
    };

    db.collection("users").where("role", "==", "teacher")
      .get()
      .then((querySnapshot) => {
        let teachersTab = [];
        querySnapshot.forEach((doc) => {
          const { nom, prenom } = doc.data()
          teachersTab.push({ label: nom + ' ' + prenom })
        });
        this.setState({
          ...this.state,
          formateurs: teachersTab
        })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);

  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      className: classes.textField,
    });
    const selectEditorProps = field => ({
      value: displayAppointmentData[field] || '',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
    });


    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
                label="Cours"
                {...textEditorProps('title')}
              />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils} locale={"fr"} >
                <KeyboardDateTimePicker
                  label="Début"
                  {...pickerEditorProps('startDate')}
                />
                <KeyboardDateTimePicker
                  okLabel="confirmer"
                  cancelLabel="Annuler"
                  label="Fin"
                  {...pickerEditorProps('endDate')}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <SchoolIcon className={classes.icon} color="action" />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel >Formateur</InputLabel>
                <Select
                  name="Formateur"
                  label="Formateur"
                  {...selectEditorProps('formateur')}
                >
                  {this.state.formateurs.map(formateur => (
                    <MenuItem key={formateur.label} value={formateur.label}>
                      {formateur.label}
                    </MenuItem>
                  ))}
                </Select>

              </FormControl>

            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                label="Salle"
                {...textEditorProps('location')}
              />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                label="Informations"
                multiline
                rows="6"
                {...textEditorProps('notes')}
              />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Supprimer
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Créer' : 'Modifier'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});
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
          Formateur : {data.formateur.split(' ')[0]}
        </div>
      </div>
    </Appointments.AppointmentContent>
  ));
/* eslint-disable-next-line react/no-multi-comp */
class TimeTableAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    this.state = {
      data: [],
      currentDate: today,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 8,
      endDayHour: 18,
      isNewAppointment: false,
      idClass: props.match.params.id,
      wrongid: false,
      formateurs: [],
    };

    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    db.collection('classes').doc(this.state.idClass).get().then((doc) => {
      this.setState({
        ...this.state,
        classe: doc.data().nom
      })
    }).catch(function (err) {
      console.log(err)
    })
    db.collection("users").where("role", "==", "teacher").get().then((querySnapshot) => {
      let teachersTab = []
      querySnapshot.forEach((doc) => {
        const { nom, prenom } = doc.data()
        teachersTab.push([doc.id, `${nom} ${prenom}`])
      });
      this.setState({
        ...this.state,
        formateurs: teachersTab
      })
    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    db.collection("classes").doc(props.match.params.id).get().then((doc) => {
      if (doc.exists) {
        let appointments = []
        doc.data().appointments.forEach(appointment => {
          let { title, startDate, endDate, id, location, formateur, notes } = appointment
          let sDate = new Date(startDate.seconds * 1000)
          let eDate = new Date(endDate.seconds * 1000)
          appointments.push({ title, startDate: sDate, endDate: eDate, id, location, formateur, notes })
        });
        this.setState({
          ...this.state,
          data: appointments
        })
      } else {
        this.setState({
          ...this.state,
          wrongid: true
        })
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;
      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }
  componentDidUpdate(props) {
    const { data } = this.state;
    this.appointmentForm.update();
    const usersRef = db.collection("users")

    this.state.formateurs.forEach(formateur => {
      const result = data.filter(appointment => appointment.formateur == formateur[1]);
      if (result.length > 0) {
        usersRef.doc(formateur[0]).get().then((doc) => {
          usersRef.doc(doc.id).set({
            ...doc.data(),
            appointments: {
              ...doc.data().appointments,
              [this.state.idClass]: result
            }
          })
        }).catch(function (err) {
          console.log(err)
        })
      }
    });
    db.collection("classes").doc(this.state.idClass).update({
      appointments: this.state.data
    });
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, classe: this.state.classe, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Nav userInfo={this.props.userInfo} />
        {this.state.wrongid ?
          <div>
            <h2>Erreur ! Cette page n'existe pas ! </h2>
          </div>
          :
          <Paper height="50%">
            <Scheduler
              firstDayOfWeek={1}
              locale={'fr-FR'}
              data={data}
              height={"auto"}
            >
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={this.currentDateChange}
              />
              <EditingState
                onCommitChanges={this.commitChanges}
                onEditingAppointmentChange={this.onEditingAppointmentChange}
                onAddedAppointmentChange={this.onAddedAppointmentChange}
              />
              <WeekView
                startDayHour={startDayHour}
                endDayHour={endDayHour}
                cellDuration={60}
                excludedDays={[0]}
              />
              <EditRecurrenceMenu />
              <Appointments
                appointmentContentComponent={AppointmentContent}
              />
              <AppointmentTooltip
                showOpenButton
                showCloseButton
                showDeleteButton
              />
              <Toolbar />
              <DateNavigator />
              <TodayButton messages={{ today: "Aujourd'hui" }} />
              <AppointmentForm
                overlayComponent={this.appointmentForm}
                visible={editingFormVisible}
                onVisibilityChange={this.toggleEditingFormVisibility}
              />
              <DragDropProvider />
            </Scheduler>

            <Dialog
              open={confirmationVisible}
              onClose={this.cancelDelete}
            >
              <DialogTitle>
                Supprimer le cours
          </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Êtes-vous sûr de vouloir supprimer ce cours ?
            </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                  Annuler
            </Button>
                <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                  Supprimer
            </Button>
              </DialogActions>
            </Dialog>

            <Fab
              color="secondary"
              className={classes.addButton}
              onClick={() => {
                this.setState({ editingFormVisible: true });
                this.onEditingAppointmentChange(undefined);
                this.onAddedAppointmentChange({
                  startDate: new Date(currentDate).setHours(startDayHour),
                  endDate: new Date(currentDate).setHours(startDayHour + 1),
                });
              }}
            >
              <AddIcon />
            </Fab>
          </Paper>
        }
      </>
    );
  }
}

export default withStyles(styles, { name: 'Agenda' })(TimeTableAdmin);