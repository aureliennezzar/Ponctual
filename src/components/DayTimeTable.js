import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

export default class DayTimeTable extends React.PureComponent {
  constructor(props) {
    super(props);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    this.state = {
      data: this.props.appointments,
      currentDate: today,
    };
  }

  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <Paper>
        <Scheduler
          data={data}
          locale={'fr-FR'}
        >
          <ViewState
            currentDate="2020-04-27"
          />
          <DayView
            startDayHour={8}
            endDayHour={18}
            cellDuration={60}
          />
          <Appointments />
          <AppointmentTooltip />
        </Scheduler>
      </Paper>
    );
  }
}