import React from 'react';
import Nav from '../../../../Nav'
import './CallRoll.css'

const CallRoll = props => {
    return (
        <>
        <Nav userInfo={props.userInfo} />
        <div className="callRollPanelCtnr">
            <div className="callRollPanel"> Faire l'appel pour le x</div>
        </div>
        </>
    )
}

export default CallRoll;