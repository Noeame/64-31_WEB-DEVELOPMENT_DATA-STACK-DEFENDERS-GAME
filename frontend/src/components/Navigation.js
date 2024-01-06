import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';

const Navigation = () => {



    return (
        <div className="navigation">
            <ul>
                <NavLink to="/introduction" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Introduction</li>
                </NavLink>
                <NavLink to="/logbook" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Logbook</li>
                </NavLink>
                <NavLink to="/description" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Game details</li>
                </NavLink>
                <NavLink to="/result" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Result</li>
                </NavLink>
                <NavLink to="/links" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Links</li>
                </NavLink>
            </ul>
        </div>
    );

};

export default Navigation;