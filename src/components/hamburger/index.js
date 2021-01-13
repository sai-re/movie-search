import React from "react";

import './Hamburger.scss';

export default function Hamburger(props) {
    return (
        <div className="nav_hamburger">
            <input type="checkbox" id="hamburger__check-js"
                onClick={ props.handleHamburger }
                onChange={ props.handleHamburger }
                checked={ props.active ? true : false } 
            />

            <div className="hamburger hamburger--spin">
                <span className="hamburger-box">
                    <span className={`hamburger-inner ${ props.active ? "hamburger--is-active" : null}` }></span>
                </span>
            </div>
        </div>
    )
}