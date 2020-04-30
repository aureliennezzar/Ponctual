import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import TuneIcon from '@material-ui/icons/Tune';
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TableChartIcon from '@material-ui/icons/TableChart';
import { auth } from "../scripts/services/firebase";



const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    container: {
        display: "flex"
    },
    ".wrapper": {
        background: "rgb(49, 130, 184)"
    }

}));

const HomeNav = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const [state, setState] = useState({
        admin: null,
        student: null,
        teacher: null
    })

    const onMouseEnter = () => {
        setOpen(true)
    }
    const onMouseLeave = () => {
        setOpen(false)
    }
    useEffect(() => {
        const user = auth().currentUser;
        if (user) {

            setState({
                ...state,
                [props.userInfo.role]: true
            })
        }
    }, []);

    const { student, teacher } = state
    return (
        <>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ display: "flex", alignItems: "center", width: 40, }}>
                <div id='wrapper' style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Accueil" ><NavLink to={"/"} ><IconButton size="medium"><HomeIcon fontSize="large" style={{}} /></IconButton></NavLink></Tooltip>

                    {open && <>
                        {teacher || student ? <><Grow in={open}>
                            <div elevation={4} className={classes.paper}>
                                <Tooltip title="Emploi du temps"><NavLink to={"/agenda"} ><Button ><TableChartIcon /></Button></NavLink></Tooltip>
                            </div>
                        </Grow></> : null
                            // <> <Grow
                            //     in={open}
                            //     style={{ transformOrigin: "0 0 0" }}
                            //     {...(open ? { timeout: 500 } : {})}
                            // >
                            //     <div elevation={4} className={classes.paper}>
                            //         <Tooltip title="Gestion"><NavLink to={"/gestion"} ><Button><TuneIcon /></Button></NavLink></Tooltip>
                            //     </div>
                            // </Grow> </>
                            }
                        {teacher || student ? <Grow
                            in={open}
                            style={{ transformOrigin: "0 0 0" }}
                            {...(open ? { timeout: 700 } : {})}
                        >
                            <div elevation={4} className={classes.paper}>
                                {/* {teacher ? <>
                                    <Tooltip title="régider des devoirs">
                                        <Button >
                                            <LibraryBooksIcon />
                                        </Button>
                                    </Tooltip>
                                </>
                                    : <>
                                        <Tooltip title="voir mes devoirs">
                                            <Button >
                                                <LibraryBooksIcon />
                                            </Button>
                                        </Tooltip>
                                    </>} */}
                            </div>
                        </Grow> : null}

                    </>}


                </div>
            </div>




        </>






    )
}
export default HomeNav