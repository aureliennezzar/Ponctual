import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import './StudentContact.css'
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
class StudentContact extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="contactPanel">
                <div className="overlayContact" onClick={this.props.initContact}>
                </div>
                <div className="contactPanelCtnr">
                    <h4>Signaler un retard ou une absence</h4>
                    <h5>Dans tout les cas t'es dans la merde frerot</h5>
                    <div className="contactPanelBtn">
                        <IconButton aria-label="delete" color="primary" onClick={this.props.initContact}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    {/* <form></form> */}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(StudentContact)