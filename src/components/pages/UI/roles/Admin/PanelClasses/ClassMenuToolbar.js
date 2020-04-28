import React, { useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TableChartIcon from '@material-ui/icons/TableChart';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from "react-router-dom";
import './ClassMenuToolbar.css'
const ClassMenuToolbar = (props) => {


    useEffect(() => {
    }, [])
    const handleEdit = () => {
        props.setClassAddComponent([true, ["edit", props.rowData]])
    }
    const handleDelete = () => {
        props.setClassAddComponent([true, ["delete", props.rowData]])
    }
    return (
        <>
            <div className="cm_toolbarCtnr">
                <div className="cm_toolbar">
                    <Tooltip title="Emploi du temps">
                        <NavLink to={`/agenda/admin/${props.rowData.uid}`}>
                            <IconButton aria-label="table" color="primary">
                                <TableChartIcon />
                            </IconButton>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Modifier">
                        <IconButton aria-label="edit" color="primary" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                        <IconButton aria-label="delete" color="primary" onClick={handleDelete}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}
export default ClassMenuToolbar;