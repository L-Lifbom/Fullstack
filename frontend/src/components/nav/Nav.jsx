import './nav.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';


function Nav() {
    return (
        <nav className={style.navBar}>
            <Link to="/games" className={style.navGames}><FontAwesomeIcon icon={faGamepad} /></Link>
            <Link to="/" className={style.navHome}>Home</Link>
            <Link to="/user" className={style.navUser}><FontAwesomeIcon icon={faUser} /></Link>
        </nav>
    );
}

export default Nav;