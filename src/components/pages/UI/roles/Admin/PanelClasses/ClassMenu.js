import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { user } from 'firebase-functions/lib/providers/auth';
import { storageRef, db } from "../../../../../../scripts/services/firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "auto",
        display: 'flex',
        justifyContent: "center",
        backgroundColor: 'whitesmoke'

    },
    theme: {
        height: "250px",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    }

}));


export default function ClassMenu() {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(true)

    const initUsersData = () => {
        db.collection("users")
            .onSnapshot(function (querySnapshot) {
                const tab = []
                querySnapshot.forEach(function (doc) {
                    
                    const { nom, prenom, profilepic } = doc.data()
                    if (profilepic > 0) {
                
                        const profilePictureRef = storageRef.child(`${profilepic}/profile_31x31.jpg`);
                        profilePictureRef.getDownloadURL().then((url) => {
                            
                            tab.push({ name: `${prenom} ${nom}`, url })
                
                        }).catch(function (error) {
                            console.log(error)
                        });
                    } else {
                        tab.push({ name: `${prenom} ${nom}`, url: "./user-graduate-solid.svg" })
                    }
                   
                });
                setUsersData([...tab])
                setLoading(false)
            });
        
    }


    useEffect(() => {
        if (loading) {
        initUsersData()
    }})

   
    const classes = useStyles()
    return (
        <>
            <div className={classes.root} >
                <div style={{ width: "50%" }}>
                    <div className={classes.theme}>
                        {usersData.map((item, i) => {
                            return <div key={i} style={{ margin: 10 }}><Tooltip title={item.name} ><Avatar alt={user.name} src={user.url} /></Tooltip></div>
                        })
                        }
                    </div>
                </div>
            </div>
        </>

    );
}