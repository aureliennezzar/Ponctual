import React from 'react';
import './ProgressBar.css'
const ProgressBar = ({ percent, type }) => {
    window.addEventListener("DOMContentLoaded", (event) => {
        const progElmt = document.querySelectorAll(`.progress${percent[0]}`)
        progElmt.forEach(element => element.style.width = `${percent[0]}%`)
      });
    return (
        <div className="prog-wrapper">
            <div className={"prog-bar "+percent[1]}>
                <span className={`progress${percent[0]} progress${percent[1]}`}></span>
            </div>
            <h2>{percent[0]}%</h2>
        </div>
    );
}

export default ProgressBar;