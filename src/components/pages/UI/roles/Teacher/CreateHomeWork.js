import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TableChartIcon from '@material-ui/icons/TableChart';
import './CreateHomeWork.css'
const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
});

const CreateHomeWork = ()=>{

    const handleClick= (e)=>{
        console.log("clicked")
    }
    return(
        <div>
        <p>Devoirs : </p>
        <div className="createHomeWorkCtnr">
          <div className="createHomeWorkForm">
            <Button
              variant="contained"
              color="primary"
              startIcon={<TableChartIcon />}
              onClick={handleClick}>

              Donner / modifier des devoirs
            </Button>
          </div>
        </div>
      </div>
    )
}
export default CreateHomeWork