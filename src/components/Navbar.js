import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/logo.svg';
import { UserContext } from './UserContext';
import Swal from 'sweetalert2';
import { BiUser, BiCommentDetail, BiEdit, BiLogOut, BiLineChart } from "react-icons/bi";

function Navbar({ avatar, username }) {
  const [click, setClick] = useState(false);
  const [state, setState] = useState(false);
  const { setValue } = useContext(UserContext);
  const history = useHistory();
  const container = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (container.current && !container.current.contains(event.target)) {
        setState(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setState(false);
    setClick(false);
  };

  const handleButtonClick = () => setState(!state);

  const logOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        setState(false);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("avatar_url");
        localStorage.removeItem("avatar_display");
        setValue(<Navbar />);
        history.push("/login-form");
      }
    });
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <img draggable="false" src={logoImage} alt='DSA' width={40} height={40} />DSA
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>Sorting</Link>
        </li>
        <li className='nav-item'>
          <Link to='/shortest-path-algorithms' className='nav-links' onClick={closeMobileMenu}>Path Finding</Link>
        </li>
        <li className='nav-item'>
          <Link to='/data-structures' className='nav-links' onClick={closeMobileMenu}>Data Structures</Link>
        </li>
        <li className='nav-item'>
          <Link to='/quiz' className='nav-links' onClick={closeMobileMenu}>Quiz</Link>
        </li>
        <li className='nav-item'>
          <Link to='/comments' className='nav-links' onClick={closeMobileMenu}>Discussion</Link>
        </li>
        <li className='nav-item' ref={container}>
          {avatar ? (
            <button className="nav-links-button" onClick={handleButtonClick}>
              <img src={avatar} className="navavatar" alt="User Avatar" />
              <span>{username}</span>
            </button>
          ) : (
            <button className="nav-links-button" onClick={handleButtonClick}>
              <span className="navbicon"><BiUser /></span>
              <span>Login</span>
            </button>
          )}
          {state && (
            <div className="dropdown">
              <ul>
                {avatar ? (
                  <>
                    <Link to='/profile' className="dropdownlinks">
                      <li>
                        <img src={avatar} width={80} alt="User Avatar" />
                        <h2>{username}</h2>
                      </li>
                    </Link>
                    <Link to='/profile' className="dropdownlinks" onClick={closeMobileMenu}><li>Profile</li></Link>
                    <Link to='/score-page' className="dropdownlinks" onClick={closeMobileMenu}><li>Scores</li></Link>
                    <Link onClick={logOut} className="dropdownlogout"><li>Logout</li></Link>
                  </>
                ) : (
                  <>
                    <p>Log in or Register to comment and to take the daily quiz!</p>
                    <Link to='/login-form' onClick={closeMobileMenu} className="dropdownlinks"><li><strong>Login</strong></li></Link>
                    <Link to='/register-form' onClick={closeMobileMenu} className="dropdownlinks"><li><strong>Register</strong></li></Link>
                  </>
                )}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

function NavbarBackend() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const adminLogout = () => {
    localStorage.removeItem("adminusername");
  };

  return (
    <nav className='navbarb'>
      <Link to='/dashboard' className='navbar-logo' onClick={closeMobileMenu}>
        <img draggable="false" src={logoImage} alt='DSA' width={168} height={45} />
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fab-times' : 'fas fab-bars'} />
      </div>
      <ul className={click ? 'navb-menu active' : 'navb-menu'}>
        <li className='navb-item'>
          <Link to='/dashboard' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiLineChart /></span> Dashboard
          </Link>
        </li>
        <li className='navb-item'>
          <Link to='/manage-users' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiUser /></span> Users
          </Link>
        </li>
        <li className='navb-item'>
          <Link to='/manage-discussion' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiCommentDetail /></span> Discussion
          </Link>
        </li>
        <li className='navb-item'>
          <Link to='/manage-quiz' className='navb-links' onClick={closeMobileMenu}>
            <span className="navbicon"><BiEdit /></span> Quiz
          </Link>
        </li>
        <li className='navb-item'>
          <a href="/admin" className="navb-links" onClick={adminLogout}>
            <span className="navbicon"><BiLogOut /></span> Log-out
          </a>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar, NavbarBackend };