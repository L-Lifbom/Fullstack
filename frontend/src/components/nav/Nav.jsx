import './nav.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/games">Games</Link>
            <Link to="/account">Account</Link>
        </nav>
    );
}

export default Nav;