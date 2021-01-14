import React from "react";

import './Hamburger.scss';

export default function Hamburger(props) {
    const { handleHamburger, active } = props;
    
    return (
        <div className="nav_hamburger">
            <input type="checkbox" id="hamburger__check-js"
                onClick={ handleHamburger }
                onChange={ handleHamburger }
                checked={ active ? true : false } 
            />

            <div className="hamburger hamburger--spin">
                <span className="hamburger-box">
                    <span className={`hamburger-inner ${ active ? "hamburger--is-active" : null}` }></span>
                </span>
            </div>
        </div>
    )
}