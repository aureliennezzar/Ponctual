import React, { useState, useEffect, useContext } from 'react'
import './styles/Projects.css'
import { TradContext } from '../../contexts/TradContext';
import { Typography, Box } from '@material-ui/core';
import { projectsData } from '../../data/ProjectsData';
import Fade from 'react-reveal/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ProgressBar from '../ProgressBar'
import ProjectCtnr from '../ProjectCtnr';
import GlitchEffect from '../GlitchEffect';
const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
        width: "400px",
        height: "200px"
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));
// const iconsSize = "90px"
const Projects = () => {
    const classes = useStyles();
    let lang = React.useContext(TradContext);
    return (
        <section className="projects">

            {lang === "ENG"
                ? <h2><GlitchEffect>My last projects</GlitchEffect></h2>
                : <h2><GlitchEffect>Mes derniers projets</GlitchEffect></h2>
            }

            <div className="projectsCtnr">
                <Fade>
                    {projectsData.map(project => {
                        return (
                            <ProjectCtnr key={project.name} project={project} />
                        )
                    })}
                </Fade>
            </div>
        </section >
    )

}

export default Projects