import React, { Component } from "react";
import Nav from "../../../Nav"
import TimeTable from './TimeTableAdmin.js'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { db } from '../../../../scripts/services/firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         width: '100%',
//         textAlign: 'center',
//         justifyContent: "space-between",
//         alignItems: "center",
//         '& input': {
//             width: 200,
//             height: '100%',
//         },
//         '& > .select': {
//             width: 200,
//             height: '80%'
//         }
//     }
// }));
// const styles = useStyles();
class TimeTablePanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            loading: true,
            classe: "",
            userInfo: props.userInfo,
            buttonComp: <></>
        }
    }
    componentWillMount() {
        if (this.state.loading) {
            this.setState({
                ...this.state,
                classe: '',
                loading: false
            })
            this.initClasses();
        }
    }
    initClasses = () => {
        db.collection("classes")
            .onSnapshot((querySnapshot) => {
                const classesTab = [];
                querySnapshot.forEach((doc) => {
                    classesTab.push({ label: doc.data().nom, value: doc.id })
                });

                this.setState({
                    ...this.state,
                    classes: classesTab,
                    loading: false
                })
            });
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            buttonComp: <NavLink style={{textDecoration: "none"}}to={`/agenda/admin/${event.target.value}`}>
                <Button variant="contained" > Voir emploi du temps </Button>
            </NavLink>
        });

    }
    render() {
        return (
            <>
                <Nav userInfo={this.state.userInfo} />
                <div>
                    <TextField
                        size="small"
                        className="select"
                        id="outlined-select-currency"
                        name="classe"
                        select
                        label="Classe"
                        value={this.state.classe}
                        onChange={this.handleChange}
                        variant="outlined"
                    >
                        {this.state.classes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {this.state.buttonComp}

                </div>
            </>
        )
    }
}
export default TimeTablePanel;
