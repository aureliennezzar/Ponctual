import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { db } from '../../../../../../scripts/services/firebase'
import { signup } from "../../../../../../scripts/auth";
import { MuiThemeProvider, Paper } from "@material-ui/core/"
import './UsersList.css'

const UsersList = (props) => {
    const [columns, setColumns] = useState([
        { title: 'Prénom', field: 'prenom' },
        { title: 'Nom', field: 'nom' },
        {
            title: 'Rôle',
            field: 'role',
            editable: "onAdd",
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
            lookup: {}
        }
    ])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const initTable = () => {
        db.collection("users")
            .onSnapshot(function (querySnapshot) {
                const userTab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, prenom, role, email, classe, telephone } = doc.data()
                    if (role !== 'admin') {
                        userTab.push({ nom, prenom, role, email, telephone, classe, uid: doc.id })
                    }
                });
                setData([...data, ...userTab])
            });
    }
    const initDataClasses = () => {
        db.collection("classes")
            .onSnapshot(function (querySnapshot) {
                const columnsCopy = [...columns]
                let lookup = {}
                columnsCopy.pop()
                querySnapshot.forEach(function (doc) {
                    const { nom } = doc.data()
                    const { id } = doc
                    lookup = { ...lookup, [id]: nom }
                });
                columnsCopy.push(
                    {
                        title: 'Classe', field: 'classe',
                        lookup
                    })
                setColumns([...columnsCopy]);
            });
    }
    useEffect(() => {
        if (loading) {
            initTable()
            initDataClasses()
            setLoading(false)
        }
    })
    return (
        <div className="usersList">
            <MuiThemeProvider theme={props.theme}>
                <MaterialTable
                    title="Utilisateurs"
                    columns={columns}
                    data={data}
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
                                let data = {...newData}
                                if(data.classe===undefined) data.classe="Sans classe"
                                const { email, nom, prenom, role, telephone, classe } = data;
                                signup(email, nom, prenom, role, classe, telephone).then(
                                    setTimeout(() => {
                                        resolve();

                                    }, 1500)
                                );
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                const { nom, prenom, email, role, classe, telephone, uid } = newData
                                let userInfos = {
                                    nom,
                                    prenom,
                                    email,
                                    role,
                                    classe,
                                    telephone,
                                }
                                if (role === "teacher") {
                                    userInfos.appointments = []
                                    userInfos.classe = ""
                                }
                                db.collection("users").doc(uid).update(userInfos);
                                setTimeout(() => {
                                    resolve();
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>

                            new Promise((resolve) => {
                                const { role, uid } = oldData;
                                if (role !== "teacher") {
                                    const { classe } = oldData;
                                    db.collection("classes").doc(classe).get().then(function (doc) {
                                        if (doc.exists) {
                                            const { eleves } = doc.data()
                                            let newTab = [...eleves]
                                            const lastStudId = newTab.indexOf(uid)
                                            newTab.splice(lastStudId, 1)
                                            db.collection("classes").doc(classe).update({
                                                eleves: newTab
                                            });
                                        } else {
                                            // doc.data() will be undefined in this case
                                            console.log("No such document!");
                                        }
                                    }).catch(function (error) {
                                        console.error("Error removing document: ", error);
                                    });
                                }

                                db.collection("users").doc(uid).delete().then(function () {
                                    console.log("Document successfully deleted!");
                                }).catch(function (error) {
                                    console.error("Error removing document: ", error);
                                });
                                setTimeout(() => {
                                    resolve();
                                }, 600);
                            }),
                    }}
                />
            </MuiThemeProvider>
        </div>
    )
}

export default UsersList;