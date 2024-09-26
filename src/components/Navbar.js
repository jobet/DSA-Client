import React,{ useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/logo.svg';
import logoImageb from './images/logo.svg';
import { UserContext } from './UserContext';
import { BiUser, BiCommentDetail, BiEdit, BiLogOut, BiLineChart} from "react-icons/bi";

// navbar for the entire website
function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const {value,setValue} = useContext(UserContext);

  return (
    <>
      <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
      <img draggable="false" src={logoImage} alt='DSA' width={40} height={40} />DSA
      </Link>  
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Sorting
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/shortest-path-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Path Finding
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/data-structures' className='nav-links' onClick={closeMobileMenu}>
              Data Structures
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/quiz' className='nav-links' onClick={closeMobileMenu}>
            Quiz
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/comments' className='nav-links' onClick={closeMobileMenu}>
            Discussion
            </Link>
          </li>
        </ul>
        <ul className='nav-menu-user'>
          {value}
        </ul>
      </nav>
    </>
  );
}
function NavbarBackend() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const adminLogout = () => {
    localStorage.removeItem("adminusername")
  }

  return (
    <>
      <nav className='navbarb'>
      <Link to='/dashboard' className='navbar-logo' onClick={closeMobileMenu}>
      <img draggable="false" src={logoImageb} alt='DSA' width={168} height={45} />
      </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fab-times' : 'fas fab-bars'} />
        </div>
        <ul className={click ? 'navb-menu active' : 'navb-menu'}>
        <li className='navb-item'>
            <Link to='/dashboard' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiLineChart/></span> Dashboard
            </Link>
          </li>
          <li className='navb-item'>
            <Link to='/manage-users' className='navb-links' onClick={() => { closeMobileMenu();}}>
              <span className="navbicon"><BiUser/></span> Users
            </Link>
          </li>
          <li className='navb-item'>
            <Link to='/manage-discussion' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiCommentDetail/></span> Discussion
            </Link>
          </li>
          <li className='navb-item'>
            <Link to='/manage-quiz' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiEdit/></span> Quiz
            </Link>
          </li>
          <li className='navb-item'>
          <a href="/admin" className="navb-links" onClick={adminLogout}>
          <span className="navbicon"><BiLogOut/></span> Log-out
            </a>
          </li>
          
        </ul>
      </nav>
    </>
  );
}
export {Navbar, NavbarBackend};