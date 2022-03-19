import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face'; // About
import SettingsIcon from '@material-ui/icons/Settings'; // Skills
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';  // Projects

import './Nav.css'
import './burger.css'
import { TradContext } from '../contexts/TradContext';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Grid, Switch } from '@material-ui/core';

import { Link } from "react-scroll";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'; // DL resume

import resume_FR from '../assets/resume_FR.pdf'
import resume_EN from '../assets/resume_EN.pdf'
const Nav = ({ setActualLang, actualLang }) => {
    // let actualLang = React.useContext(TradContext);

    const [checkedLng, setCheckedLng] = React.useState(false)
    const [navOpen, setNavOpen] = React.useState(false)
    const drawerData = [
        [actualLang === "ENG" ? 'About' : 'A propos', <FaceIcon />, 'hero'],
        [actualLang === "ENG" ? 'Skills' : 'Compétences', <SettingsIcon />, 'skills'],
        [actualLang === "ENG" ? 'Projects' : 'Projets', <EmojiObjectsIcon />, 'projects'],
        [actualLang === "ENG" ? 'Contact me' : 'Me contacter', <MailIcon />, 'contact'],
    ]
    const openBurger = (e) => {
        console.log(e.target.className);
        const { className } = e.target

        if (className === "PrivateSwitchBase-input-4 MuiSwitch-input" || className === "switch-wrapper" || className === "MuiGrid-root MuiGrid-item" || className === "") return

        const menu = document.querySelector('.navMenu')
        const wrapper = document.querySelector('.navBurgerWrapper')
        const burger = document.querySelector('.navBurger')
        if (navOpen) {
            wrapper.classList.add("animate")
            menu.classList.remove('opened');
            window.setTimeout(() => {
                burger.classList.remove("cross")
                wrapper.classList.remove('animate');

            }, 250);
        } else {
            wrapper.classList.add("animate")
            window.setTimeout(() => {
                burger.classList.add("cross")
                wrapper.classList.remove('animate');

            }, 250);
            menu.classList.add("opened")
        }
        setNavOpen(!navOpen)
    }
    const handleChange = (event) => {
        setCheckedLng(event.target.checked)
        event.target.checked
            ? setActualLang('FR')
            : setActualLang('ENG')
    };
    return (
        <nav>
            <h1>Aurélien NEZZAR</h1>
            <ul className="navList">
                {
                    drawerData.map((text,i) => (
                        <Link
                            key={i}
                            activeClass="active"
                            to={text[2]}
                            spy={true}
                            smooth={true}
                            offset={-60}
                            duration={100}>
                            <li key={text[0]}>{text[0]}</li>
                        </Link>
                    ))}
                <a className="openResume" key="Open resume" href={actualLang === "ENG" ? resume_EN : resume_FR} target="_blank">{actualLang === "ENG" ? 'Open resume' : 'Voir CV'} <OpenInBrowserIcon /></a>
            </ul>
            <div className="switch-wrapper">
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                                EN
                            </Grid>
                        <Grid item>
                            <Switch
                                checked={checkedLng}
                                onChange={handleChange}
                                name="checkedLng"
                                color="primary"
                            />
                        </Grid>
                        <Grid item>
                                FR
                            </Grid>
                    </Grid>
                </Typography>
            </div>
            <div className="navBurgerWrapper" onClick={openBurger}>
                <div className="navBurger" >
                    <span className="bar1"></span>
                    <span className="bar2"></span>
                    <span className="bar3"></span>
                </div>
                <div className="navMenu">
                    <ul className="navList menuList">
                        {
                            drawerData.map(text => (
                                <Link
                                    activeClass="active"
                                    to={text[2]}
                                    spy={true}
                                    smooth={true}
                                    offset={-60}
                                    duration={100}>
                                    <li key={text[0]}>{text[0]}</li>
                                </Link>
                            ))}
                        <li key="Open resume" ><a className="openResume" href={actualLang === "ENG" ? resume_EN : resume_FR} target="_blank">{actualLang === "ENG" ? 'Open resume' : 'Voir CV'} <OpenInBrowserIcon /></a></li>

                        <li key="switch" className="switch-wrapper">
                            <div className="switch-wrapper-lang">
                                <p>EN</p>
                                <Switch
                                    checked={checkedLng}
                                    onChange={handleChange}
                                    name="checkedLng"
                                    color="primary"
                                />
                                <p>FR</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;