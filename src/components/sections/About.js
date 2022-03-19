import React, { useEffect, useContext, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import profilePic from '../../assets/avatar.jpg'
import illustration from '../../assets/illustration.png'
import Webgl from '../Webgl'
import './styles/About.css'
import { TradContext } from '../../contexts/TradContext';
import { Box } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import GlitchEffect from '../GlitchEffect';

const About = ({ setSecret,setGlitch }) => {
    let lang = React.useContext(TradContext);
    return (
        <section className="hero">
            <div className="hero-body">
                {lang === "ENG"
                    ? <Fade>
                        <h1><GlitchEffect>Front-end Developer</GlitchEffect></h1>
                        <Typography paragraph component={'span'} className="aboutDescription">
                            <Box fontFamily="Lato" m={1}>
                                <GlitchEffect>
                                    I've been interested in programming since I was 13, I love what I do, especially bringing ideas to life.
                                </GlitchEffect>
                            </Box>
                        </Typography>
                    </Fade>
                    : <Fade>
                        <h1><GlitchEffect>Developpeur Front-end</GlitchEffect></h1>
                        <Typography paragraph component={'span'} className="aboutDescription">
                            <Box fontFamily="Lato" m={1}>
                                <GlitchEffect>
                                    Je m'intéresse à la programmation depuis que j'ai 13 ans, j'adore ce que je fais, surtout donner vie à mes idées.
                            </GlitchEffect>
                            </Box>
                        </Typography>
                    </Fade>
                }
                <div className="hero-body-center">
                    <Fade>
                        <div className="profilePicCtnr">
                            <div>
                                <img alt="Aurélien face" className="profilePic" src={profilePic}></img>
                            </div>
                            {/* <div className="githubCtnr">
                            <img className="githubIcon" height="32" width="32" src={githubIcon}></img>
                        </div> */}
                        </div>
                        <Webgl setSecret={setSecret} setGlitch={setGlitch}/>
                    </Fade>

                </div>
            </div>

            <Fade>
                <div className="hero-foot">
                    <div className="illustrationCtnr">
                        <img alt="Digital illustration" className="illustration" src={illustration} title="Designed by Freepik"></img>
                    </div>
                </div>
            </Fade>
        </section>
    )

}

export default About