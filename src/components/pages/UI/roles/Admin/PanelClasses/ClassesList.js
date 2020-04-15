import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { db } from '../../../../../../scripts/services/firebase'
import { signup } from "../../../../../../scripts/auth";
import { MuiThemeProvider, Paper } from "@material-ui/core/"
import ClassAdd from './ClassAdd';
import "./ClassesList.css";
const ClassesList = (props) => {
    const [classAddComponent, setClassAddComponent] = useState(false)
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
                                setClassAddComponent(true)
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

                                    <div
                                        style={{
                                            fontSize: 100,
                                            textAlign: 'center',
                                            color: 'white',
                                            backgroundColor: '#43A047',
                                        }}
                                    >
                                        {rowData.nom}
                                    </div>
                                )
                            },
                        },
                    ]}
                />
            </MuiThemeProvider>
            {classAddComponent && <ClassAdd setClassAddComponent={setClassAddComponent} />}
        </div>
    )

}


export default ClassesList;