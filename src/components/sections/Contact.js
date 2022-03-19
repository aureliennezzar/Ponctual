import React, { useEffect, useContext } from 'react'
import "./styles/Contact.css"
import twitterIcon from '../../assets/twitterIcon.svg'
import githubIcon from '../../assets/githubIcon.svg'
import linkedinIcon from '../../assets/linkedinLogo.svg'
import { TradContext } from '../../contexts/TradContext';
import GlitchEffect from '../GlitchEffect'

const iconSize = 35
const Contact = () => {
    let lang = React.useContext(TradContext);
    const contactsStyle = {
        width: "auto",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "10px 0"
    }
    return (
        <section className="contact">
            <div className="contactData">
                {lang === "ENG"
                    ? <h2><GlitchEffect>Reach me on social medias...</GlitchEffect></h2>
                    : <h2><GlitchEffect>Retrouvez moi sur les résaux sociaux...</GlitchEffect></h2>
                }
                <div className="contactIcons">
                    <div style={contactsStyle}>
                        <img src={twitterIcon} alt="Twitter Icon" width={iconSize} height={iconSize} title="Twitter"></img>
                        <a href="https://twitter.com/aureliennezzar" target="_blank" rel="noopener noreferrer">
                            <GlitchEffect>https://twitter.com/aureliennezzar/</GlitchEffect>
                        </a>
                    </div>
                    <div style={contactsStyle}>
                        <img src={githubIcon} alt="Github Icon" width={iconSize} height={iconSize} title="GitHub"></img>
                        <a href="https://github.com/aureliennezzar" target="_blank" rel="noopener noreferrer">
                            <GlitchEffect>https://github.com/aureliennezzar/</GlitchEffect>
                        </a>
                    </div>
                    <div style={contactsStyle}>
                        <img src={linkedinIcon} alt="Linkedin Icon" width={iconSize} height={iconSize} title="Linkedin"></img>
                        <a href="https://www.linkedin.com/in/aureliennezzar/" target="_blank" rel="noopener noreferrer">
                            <GlitchEffect>https://linkedin.com/in/aureliennezzar/</GlitchEffect>
                        </a>
                    </div>

                </div>

                {lang === "ENG"
                    ? <h5><GlitchEffect>... or send me an email : </GlitchEffect></h5>
                    : <h5><GlitchEffect>... ou envoyez-moi un email : </GlitchEffect></h5>
                }

                <div className="emailCtnr">
                    <p><a href="mailto:aurelien.nezzar@outlooK.fr?subject=SweetWords">
                        <GlitchEffect>aurelien.nezzar@outlook.fr</GlitchEffect></a></p>
                </div>
            </div>
        </section>
    )

}

export default Contact