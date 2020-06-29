import React from 'react';
import Home from '../assets/images/home.svg';
import Help from '../assets/images/help.svg';
import Inbox from '../assets/images/inbox.svg';
import Invoices from '../assets/images/invoices.svg';
import Settings from '../assets/images/settings.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPoll, faUser, faComments, faCalendarAlt, faTable} from '@fortawesome/free-solid-svg-icons'
import './index.scss'

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar__header">
        <h1>IMPEKABLE</h1>
      </div>
      <div className="Sidebar__menu">
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <img src={Home} alt="" />
          <p>Home</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <FontAwesomeIcon icon={faPoll} />
          <p>Dashboard</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <img src={Inbox} alt="" />
          <p>Inbox</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <FontAwesomeIcon icon={faTable} />
          <p>Products</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <img src={Invoices} alt="" />
          <p>Invoices</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <FontAwesomeIcon icon={faUser} />
          <p>Customers</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <FontAwesomeIcon icon={faComments} />
          <p>Chat Room</p>
        </div>
        <div className="Sidebar__menu__item Sidebar__menu__item__active">
          <div className="Sidebar__menu__item__bookmark"></div>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <p>Calendar</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <img src={Help} alt="" />
          <p>Help Center</p>
        </div>
        <div className="Sidebar__menu__item">
          <div className="Sidebar__menu__item__bookmark"></div>
          <img src={Settings} alt="" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
