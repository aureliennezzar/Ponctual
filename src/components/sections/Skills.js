import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import './styles/Skills.css'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { TradContext } from '../../contexts/TradContext';
import { skillsData, techData, appData } from '../../data/SkillsData'
import { Box } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import GlitchEffect from '../GlitchEffect';
import GlitchContext from '../../contexts/GlitchContext';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        // margin: theme.spacing(1),
        width: 200,
        position: 'absolute',
        cursor: 'default',
        top: "100%",
        left: "50%",
        transform: "translateX(-50%) !important",
        zIndex: 1
    },
    description: {
        width: "50vw",
        margin: "0 0 0 0",
        alignItems: "center",
        paddingBottom: "30px",
        [theme.breakpoints.down('sm')]: {
            width: "90vw",
        },
    },
    typo: {
        padding: theme.spacing(1),
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

const iconsSize = "90px"

const Skills = () => {
    const classes = useStyles();
    let lang = React.useContext(TradContext);

    const [state, setState] = React.useState({
        htmlIcon: false,
        cssIcon: false,
        jsIcon: false,
        pythonIcon: false,
        reactIcon: false,
        webglIcon: false,
        firebaseIcon: false,
        gitIcon: false,
        vsCodeIcon: false,
    })
    const handleChange = (e) => {
        // Get second class of icon
        const target = e.currentTarget.getAttribute('class').split(' ')[1]
        setState({
            htmlIcon: false,
            cssIcon: false,
            jsIcon: false,
            pythonIcon: false,
            reactIcon: false,
            webglIcon: false,
            firebaseIcon: false,
            gitIcon: false,
            vsCodeIcon: false,
            [target]: !state[target]
        })
    }
    return (
        <section className="skills">
            {lang === "ENG"
                ? <>
                    <h2><GlitchEffect>Hi, I'm Aurélien. Welcome to my portfolio !</GlitchEffect></h2>
                    <Typography component={'span'} paragraph >

                        <Box fontFamily="Lato" m={1} className={classes.description}>
                            <GlitchEffect>
                                I like programming since 2012, I first began doing small CLI projects that were only useful for me (usually done with Batch or Visual Basic),
                                then I moved on to Python, to make more useful applications. I recently started learning web development, I really love it!
                            </GlitchEffect>
                        </Box>
                    </Typography>
                </>
                : <>
                    <h2><GlitchEffect>Je m'appelle Aurélien. Bienvenue !</GlitchEffect></h2>
                    <Typography component={'span'} paragraph >
                        <Box fontFamily="Lato" m={1} className={classes.description}>
                            <GlitchEffect>
                                J'adore programmer depuis 2012, j'ai d'abord commencé par faire des petits projets "CLI" à des fins personnelles (fait en Batch ou Visual Basic),
                                puis j'ai decouvert Python ce qui m'as permis de faire des projets personnels plus complexes. J'ai recemment debuté le développement web, j'adore ça!
                            </GlitchEffect>
                        </Box>
                    </Typography>
                </>
            }


            {lang === "ENG"
                ? <h4><GlitchEffect>The langages I speak</GlitchEffect></h4>
                : <h4><GlitchEffect>Les langages que je maîtrise</GlitchEffect></h4>
            }
            <div className="skillsCtnr">
                {skillsData.map(skill => {
                    return (
                        <div key={skill.imgId} className={`icon ${skill.iconClass}`} onClick={handleChange}>
                            <Fade>
                                <img src={skill.iconSrc} id={skill.imgId} alt={`${skill.imgAlt} icon`} width={iconsSize} height={iconsSize}></img>
                            </Fade>
                            <span className="tooltiptext">{skill.title}</span>
                            <Grow in={state[skill.iconClass]}>
                                <Paper elevation={4} className={classes.paper}>
                                    <Typography component={'span'} className={classes.typo}>
                                        {skill.title}
                                    </Typography>
                                    <Divider />
                                    <Typography component={'span'} className={classes.typo}>

                                        <Box fontFamily="Lato" m={1}>
                                            {lang === "ENG"
                                                ? skill.textENG
                                                : skill.textFR
                                            }
                                        </Box>
                                    </Typography>
                                </Paper>
                            </Grow>
                        </div>
                    )
                })}
            </div>

            <Fade>
                {lang === "ENG"
                    ? <h4><GlitchEffect>Technologies I am using</GlitchEffect></h4>
                    : <h4><GlitchEffect>Les technologies que j'utilise</GlitchEffect></h4>
                }
            </Fade>
            <div className="techCtnr">
                {techData.map(tech => {
                    return (
                        <div key={tech.imgId} className={`icon ${tech.iconClass}`} onClick={handleChange}>
                            <Fade>
                                {
                                    tech.title === 'Firebase'
                                        ? <img src={tech.iconSrc} id={tech.imgId} alt={`${tech.imgAlt} icon`} width={64} height={87}></img>
                                        : <img src={tech.iconSrc} id={tech.imgId} alt={`${tech.imgAlt} icon`} width={iconsSize} height={iconsSize}></img>
                                }
                            </Fade>
                            <span className="tooltiptext">{tech.title}</span>
                            <Grow in={state[tech.iconClass]}>
                                <Paper elevation={4} className={classes.paper}>
                                    <Typography component={'span'} className={classes.typo}>
                                        {tech.title}
                                    </Typography>
                                    <Divider />
                                    <Typography component={'span'} className={classes.typo}>
                                        <Box fontFamily="Lato" m={1}>
                                            {lang === "ENG"
                                                ? tech.textENG
                                                : tech.textFR
                                            }
                                        </Box>
                                    </Typography>
                                </Paper>
                            </Grow>
                        </div>
                    )
                })}
            </div>
            <Fade>
                {lang === "ENG"
                    ? <h4><GlitchEffect>Applications I am using</GlitchEffect></h4>
                    : <h4><GlitchEffect>Les applications que j'utilise</GlitchEffect></h4>
                }
            </Fade>
            <div className="appCtnr">
                {appData.map(app => {
                    return (
                        <div key={app.imgId} className={`icon ${app.iconClass}`} onClick={handleChange}>
                            <Fade>
                                <img src={app.iconSrc} id={app.imgId} alt={`${app.imgAlt} icon`} width={iconsSize} height={iconsSize}></img>
                            </Fade>
                            <span className="tooltiptext">{app.title}</span>
                            <Grow in={state[app.iconClass]}>
                                <Paper elevation={4} className={classes.paper}>
                                    <Typography component={'span'} className={classes.typo}>
                                        {app.title}
                                    </Typography>
                                    <Divider />
                                    <Typography component={'span'} className={classes.typo}>
                                        <Box fontFamily="Lato" m={1}>
                                            {lang === "ENG"
                                                ? app.textENG
                                                : app.textFR
                                            }
                                        </Box>
                                    </Typography>
                                </Paper>
                            </Grow>
                        </div>
                    )
                })}
            </div>

        </section>
    )

}

export default Skills