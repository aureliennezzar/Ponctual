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
function valuetext(value) {
    return `${value} min`;
}
class StudentContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radioValue: "retard"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();
        alert('submit')
    }
    handleChange(event) {
        this.setState({
            ...this.state,
            radioValue: event.target.value
        });
    };
    render() {
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
                                            defaultValue={30}
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
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            id="outlined-textarea"
                            style={{ paddingBottom: "75px", marginTop: "20px" }}
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
            </div>
        )
    }
}

export default withStyles(styles)(StudentContact)