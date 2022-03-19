import React, { useState, useEffect } from 'react';
import logo from '../assets/logozer.png'
import './Matrix.css'
const Matrix = ({ setSecret, setGlitch }) => {
    const [text, setText] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')
    const [text4, setText4] = useState('')
    const [files, setFiles] = useState('')
    const [percent, setPercent] = useState('')
    const [percent2, setPercent2] = useState('')
    useEffect(() => {
        const sections = document.getElementsByTagName('section')
        const navbar = document.getElementsByTagName("nav")
        const contact = document.querySelector('.contact')
        const contactData = document.querySelector('.contactData')
        const skills = document.querySelector('.skills')
        skills.style.background = "#000"
        contact.style.background = "#000"
        let p = document.createElement("p");
        p.innerHTML="TWVyY2kgZGUgdm90cmUgdmlzaXRlICEg"
        contactData.appendChild(p);
        navbar[0].style.background = "#00ff00"
        for (let item of sections) {
            item.style.color = "#00ff00"
        }
        document.body.style.background = "#000"

        const filesText = `>index.html \n>style.css \n>app.js \n>injection.js \n>reversetcp.bash \n>__init__.py \n>main.py \n>setup.py`
        typingEffect('Downloading Files.....', setText, 30)

        setTimeout(() => {
            typingEffect(filesText, setFiles, 15)
        }, 800);
        setTimeout(() => {
            typingEffect('Loading.....', setText2, 30)
        }, 2700);
        setTimeout(() => {
            percentEffect(10, setPercent)
        }, 3300);

        setTimeout(() => {
            typingEffect('Loading Image.....', setText3, 30)
        }, 4500);
        setTimeout(() => {
            percentEffect(25, setPercent2, true)
        }, 5200);
        setTimeout(() => {
            typingEffect('Reboot complete. ¯\\_(ツ)_/¯', setText4, 0)
        }, 8000);
        setTimeout(() => {
            setSecret(false)
        }, 10000);
    }, [])
    const percentEffect = (speed, func, mode = false) => {
        const hider = document.querySelector('.matrix-imgHider')
        for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
                func(i + '%')

                if (mode) {
                    hider.style.right = `-${250 * (i / 100)}px`
                }
            }, speed + (i * speed));
        }
    }
    const typingEffect = (text, func, speed) => {
        let line = ""
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                line += text[i]

                func(line)
            }, speed + (i * speed));
        }
    }
    return (
        <section className="matrix">
            <div className="matrix-terminal">
                <p>Rebooting.....<br />{text}<br />{files.split('\n').map((letter,i) => {
                    return (
                        
                            <span key={i} className="matrix-filename">{letter}<br /></span>
                        )
                })}<br />
                    {text2}{percent}<br />{text3}{percent2}<br />{text4}
                </p>
                <div className="matrix-imgWrapper">
                    <img src={logo}></img>
                    <div className="matrix-imgHider">

                    </div>

                </div>
            </div>
        </section>
    );
}

export default Matrix;