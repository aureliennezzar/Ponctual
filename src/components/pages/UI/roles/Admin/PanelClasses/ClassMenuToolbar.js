import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TableChartIcon from '@material-ui/icons/TableChart';
import Tooltip from '@material-ui/core/Tooltip';
import './ClassMenuToolbar.css'
const ClassMenuToolbar = (props) => {
    useEffect(() => { }, [])
    return (
        <div className="cm_toolbarCtnr">
            <div className="cm_toolbar">
                <Tooltip title="Emploi du temps">
                    <IconButton aria-label="table" color="primary">
                        <TableChartIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Modifier">
                    <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                    <IconButton aria-label="delete" color="primary">
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}
export default ClassMenuToolbar;