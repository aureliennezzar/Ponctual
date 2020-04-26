import React, { useState, useEffect, useRef } from 'react';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Link } from 'react-router-dom'
import { signOut } from "../scripts/auth";
import { db, auth } from "../scripts/services/firebase";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import { storageRef } from "../scripts/services/firebase";

const theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: "blue"
            
          }
        }
      }
    }
  })

const useStyles = makeStyles(theme => ({
    overrides: {
        MuiIconButton: {
          root: {
            '&:hover': {
              backgroundColor: "$labelcolor"
            }
          }
        }
      },
    root: {

        height: "100%",
        width: "auto",
        zIndex: "99999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {

        zIndex: "99999",
        marginRight: theme.spacing(2)
    }
}));

const PictureNav = props => {
    const classPicture = useStyles();
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("")
    const anchorRef = useRef(null);


    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleFile = event => {
        let file = event.target.files[0]
        uploadFile(file,event);
    }

    const { imageComponent } = props
   console.log(auth().currentUser.uid)
    const uploadFile = (file,event) => {
        if (userId && file !== undefined && file.type.split('/')[0] === "image") {
            storageRef.child(userId).listAll().then(function (res) {
                if (res.items.length > 0) {
                    res.items.forEach(function (itemRef) {
                        console.log('je suis rentré')
                        itemRef.delete().then(function () {
                            console.log("File deleted successfully");
                        }).catch(function (error) {
                            console.log(error);
                        });
                    })
                }
                storageRef.child(`${userId}/${file.name}`).put(file).then(function (snapshot) {
                    db.collection('users').doc(userId).update({
                        profilepic:true,
                        profilePicChanged:true
                    })
                    console.log('Uploaded a blob or file!');
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
            });
        }
    
        handleClose(event)
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        const user = auth().currentUser;
        if(user ){
            setUserId(user.uid)
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
     }
    }, [open]);
    return (
        <>
            <div className={classPicture.root}>
                <div style={{width:"100%",height:"100%"}}>
                    <MuiThemeProvider theme={theme}>
                    <IconButton 
                        size="medium"
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        aria-label="profile"
                        onClick={handleToggle}
                    >
                        {imageComponent}
                    </IconButton>
                    </MuiThemeProvider>

                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    width: 200,
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom",

                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <br></br>
                                            <MenuItem >
                                                <input
                                                    type="file"
                                                    id="file-input"
                                                    onChange={handleFile}
                                                    style={{ display: "none" }}>
                                                </input>

                                                <label
                                                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                                    htmlFor="file-input">
                                                    <PhotoCameraIcon /> Changer de photo
                                                </label>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}><AccountBoxIcon /> Mon profile</MenuItem>

                                            <Link
                                                to='/'
                                                onClick={signOut}
                                                style={{ textDecoration: "none", color: "black" }}>
                                                <MenuItem>
                                                    <ExitToAppIcon />Se déconnecter
                                                </MenuItem>
                                            </Link>
                                            <br></br>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </>
    )
}
export default PictureNav