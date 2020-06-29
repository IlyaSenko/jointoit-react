import React from 'react';
import './index.scss';
import Search from '../assets/images/search.svg';
import Help from '../assets/images/help.svg';
import Badge from '../assets/images/badge.svg';
import Arrow from '../assets/images/arrow.svg';
import Avatar from '../assets/images/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faBell } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header className="Header">
      <div className="Header__inputSection">
        <img src={Search} alt="" />
        <input type="text" name="" placeholder="Search transactions, invoices or help" />
      </div>
      <div className="Header__accountSection">
        <img src={Help} alt="" />
        <FontAwesomeIcon icon={faComments} />
        <div className="Header__accountSection__notifications">
          <FontAwesomeIcon icon={faBell} />
          <img src={Badge} alt="" />
        </div>
        <div className="Header__accountSection__vr"></div>
        <p>John Doe</p>
        <img src={Arrow} alt="" />
        <img className="Header__accountSection__avatar" src={Avatar} alt="" />
      </div>
    </header>
  )
}

export default Header;
