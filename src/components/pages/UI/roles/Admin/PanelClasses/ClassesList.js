import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { db } from '../../../../../../scripts/services/firebase'
import { MuiThemeProvider, Paper } from "@material-ui/core/"
import { makeStyles } from '@material-ui/core/styles';
import ClassAdd from './ClassAdd';
import "./ClassesList.css";
import ClassMenu from "./ClassMenu"
import ClassMenuToolbar from "./ClassMenuToolbar"
import { ClassAddContext } from './ClassAddContext'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        height: "100%",
        display: 'flex',
        // justifyContent: "center",
        backgroundColor: 'whitesmoke'

    },
    theme: {
        height: "250px",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    }

}));

const ClassesList = (props) => {
    const classes = useStyles()
    const [classAddComponent, setClassAddComponent] = useState([false, ["add",""]])
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        columns: [
            { title: 'Nom', field: 'nom' },
            { title: "Nombre d'élèves", field: 'nbEleves', type: 'numeric' },
            { title: 'Formateur', field: 'formateur' },
            {
                title: 'Status',
                field: 'status',
                lookup: { 0: 'Pas en cours', 1: 'En cours' },
                editable: 'onAdd'
            },
        ],
        data: [],
    });
    const initTable = () => {
        db.collection("classes")
            .onSnapshot(function (querySnapshot) {
                const classeTab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, eleves, formateur, status } = doc.data()
                    classeTab.push({ nom, nbEleves: eleves.length, formateur, status, uid: doc.id })
                });
                setState({
                    ...state,
                    data: [...state.data, ...classeTab]
                })
            });
    }

    useEffect(() => {
        if (loading) {
            initTable()
            setLoading(false);
        }
    })

    return (
        <div className="classesList">
            <ClassAddContext.Provider value={classAddComponent}>
                <MuiThemeProvider theme={props.theme}>
                    <MaterialTable
                        title="Classes"
                        columns={state.columns}
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
                        options={{
                            pageSizeOptions: [9],
                            pageSize: 9,
                            headerStyle: {
                                backgroundColor: '#F4F7F6'
                            },
                            rowStyle: {
                                backgroundColor: '#F4F7F6'
                            }
                        }}
                        data={state.data}
                        actions={[
                            {
                                icon: 'add',
                                onClick: () => {
                                    setClassAddComponent([true,["add",""]])
                                },
                                isFreeAction: true,
                                tooltip: 'Ajouter',
                            }
                        ]}
                        localization={{
                            body: {
                                emptyDataSourceMessage: "Aucune classe."
                            },
                            pagination: {
                                labelDisplayedRows: "{from}-{to}",
                                labelRowsSelect: "lignes",
                                labelRowsPerPage: "Lignes par page:",
                                firstAriaLabel: "Première page",
                                firstTooltip: "Première page",
                                previousAriaLabel: "Page précedente",
                                previousTooltip: "Page précedente",
                                nextAriaLabel: "Page suivante",
                                nextTooltip: "Page suivante",
                                lastAriaLabel: "Dernière page",
                                lastTooltip: "Dernière page",

                            },
                            toolbar: { searchPlaceholder: 'Rechercher' }
                        }}
                        detailPanel={[
                            {
                                tooltip: 'Afficher',
                                render: rowData => {

                                    return (
                                        <div className={classes.root}>
                                            <ClassMenuToolbar rowData={rowData} setClassAddComponent={setClassAddComponent}/>
                                            <div style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <div style={{ width: "60%" }}>
                                                    <div className={classes.theme}>
                                                        <ClassMenu rowData={rowData} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                            },
                        ]}
                    />

                    {classAddComponent[0] && <ClassAdd setClassAddComponent={setClassAddComponent} mode={classAddComponent[1]} />}
                </MuiThemeProvider>
            </ClassAddContext.Provider>


        </div>
    )

}


export default ClassesList;