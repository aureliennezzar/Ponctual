import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width:"auto",
        display:'flex',
        justifyContent:"center",
        backgroundColor: 'whitesmoke'
        
    },
    theme: {
        width:'50%'
    }

}));

function generate(element) {
    console.log(element)
    return [0, 1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function ClassMenu() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
          <div style={

              {width:"70%"}}>
            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <div className={classes.theme}>
                        <List style={{
                            height: "250px",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap"
                        }}>
                            {generate(
                                <ListItem style={{
                                    display:'flex',
                                    justifyContent:"space-between",
                                    width:'50%',
                                    padding:5
                                }}> 
                                    <ListItemAvatar>
                                        <Avatar >
                                            <Fab >
                                                <Tooltip title="Aurélien" >
                                                    <FolderIcon />
                                                </Tooltip>
                                            </Fab>
                                        </Avatar>
                                    </ListItemAvatar>
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>
         </div>
        </div>
    );
}