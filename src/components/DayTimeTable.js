import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

export default class DayTimeTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.appointments,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          locale={'fr-FR'}
        >
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