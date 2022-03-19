import React, { useState, useEffect, useContext } from 'react';
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Matrix from './Matrix';
import GlitchTest from './GlitchTest';
import { GlitchContext } from '../contexts/GlitchContext';

function Main() {
    const [secret, setSecret] = useState(false)
    const [glitch, setGlitch] = useState(false)
   
    return (
        <GlitchContext.Provider value={glitch}>
            {secret ? <Matrix setSecret={setSecret} /> : null}
            <About setSecret={setSecret} setGlitch={setGlitch}/>
            <Skills />
            <Projects />
            <Contact />
        </GlitchContext.Provider>
    )
}
export default Main;