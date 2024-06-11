import './nav.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faGamepad } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';


function Nav() {
    return (
        <nav className={style.navBar}>
            <Link to="/" className={style.navHome}><img src={logo} alt="logo" title="Home" /></Link>
            <div className={style.navLinks}>
                <Link to="/games" className={style.navGames}><FontAwesomeIcon icon={faGamepad} /><p>Games</p></Link>
                <Link to="/user" className={style.navUser}><FontAwesomeIcon icon={faUser} /><p>User</p></Link>
                <FontAwesomeIcon icon={faBars} className={style.hamburger} />
            </div>
        </nav>
    );
}

export default Nav;