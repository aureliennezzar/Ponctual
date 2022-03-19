import React from 'react';
import './GlitchTest.css'
import GlitchEffect from './GlitchEffect';
const GlitchTest = () => {
    return (
        <section className="test">
            <p><GlitchEffect active={true}> Ceci est un test :) faites pas les gamins wsh c'est de la frappe ce que j'ai fais svp recrutez moi </GlitchEffect></p>
        </section>
    );
}

export default GlitchTest;