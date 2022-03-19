import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Main from './components/Main'
import FaceIcon from '@material-ui/icons/Face'; // About
import SettingsIcon from '@material-ui/icons/Settings'; // Skills
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';  // Projects
// Contact (mailicon)
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'; // DL resume
import Switch from '@material-ui/core/Switch';
import { Link } from "react-scroll";
import Grid from '@material-ui/core/Grid';
import resume from './assets/resume.pdf'
import { TradContext } from './contexts/TradContext';
import Nav from './components/Nav';
import Matrix from './components/Matrix';



function App(props) {
    const [checkedLng, setCheckedLng] = React.useState(false)
    const [actualLang, setActualLang] = React.useState('ENG')





    return (
        <>
            <TradContext.Provider value={actualLang}>
                <Nav setActualLang={setActualLang} actualLang={actualLang}/>
                <Main />
            </TradContext.Provider>
        </>
    )
}

export default App;