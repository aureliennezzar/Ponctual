import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { db } from '../../../../../../scripts/services/firebase'
import { signup } from "../../../../../../scripts/auth";
import { MuiThemeProvider, Paper } from "@material-ui/core/"
import './UsersList.css'

const UsersList = (props) => {
    const [state, setState] = useState({
        columns: [
            { title: 'Prénom', field: 'prenom' },
            { title: 'Nom', field: 'nom' },
            {
                title: 'Rôle',
                field: 'role',
                lookup: { student: "élève", teacher: "formateur" }
            },
            {
                title: 'Email',
                field: 'email',
                editable: "onAdd"
            },
            {
                title: 'Téléphone',
                field: 'telephone',
            },
            {
                title: 'Classe', field: 'classe',
                lookup: {0: "testclasse", 1: "testclasse"}
            }
        ],
        data: [],
    });
    const [loading, setLoading] = useState(true)
    const initTable = () => {
        db.collection("users")
            .onSnapshot(function (querySnapshot) {
                const userTab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, prenom, role, email, classe, telephone } = doc.data()
                    if (role != 'admin') {
                        userTab.push({ nom, prenom, role, email, telephone, classe, uid: doc.id })
                    }
                });
                setState({
                    ...state,
                    data: [...state.data, ...userTab]
                })
            });
        setLoading(false)
    }
    useEffect(() => {
        if (loading) initTable()
    })
    return (
        <div className="usersList">
            <MuiThemeProvider theme={props.theme}>
                <MaterialTable
                    title="Utilisateurs"
                    columns={state.columns}
                    data={state.data}
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
                    localization={{
                        body: {
                            addTooltip: "Ajouter",
                            deleteTooltip: "Supprimer",
                            editTooltip: "Modifier",
                            editRow: {
                                deleteText: "Êtes-vous sur de vouloir supprimer cet utilisateur ?",
                                cancelTooltip: "Annuler",
                                saveTooltip: "Confirmer"
                            },
                            filterRow: {
                                filterTooltip: "Filtrer"
                            },
                            emptyDataSourceMessage: "Aucun utilisateur."
                        },
                        header: {
                            actions: ""
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
                    
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                const { email, nom, prenom, role, telephone, classe } = newData;
                                console.log(newData)
                                signup(email, nom, prenom, role, classe, telephone).then(
                                    setTimeout(() => {
                                        resolve();

                                    }, 1500)
                                );
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                const { nom, prenom, email, role, classe, telephone, uid } = newData
                                db.collection("users").doc(uid).set({
                                    nom,
                                    prenom,
                                    email,
                                    role,
                                    classe,
                                    telephone
                                })
                                    .then(function () {
                                        console.log("Document successfully written!");
                                        setTimeout(() => {
                                            resolve();
                                        }, 600);
                                    })
                                    .catch(function (error) {
                                        console.error("Error writing document: ", error);
                                    });
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                db.collection("users").doc(oldData.uid).delete().then(function () {
                                    setTimeout(() => {
                                        resolve();

                                    }, 600);
                                    console.log("Document successfully deleted!");
                                }).catch(function (error) {
                                    console.error("Error removing document: ", error);
                                });
                            }),
                    }}
                />
            </MuiThemeProvider>
        </div>
    )
}

export default UsersList;