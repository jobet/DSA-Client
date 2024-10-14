import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/logo.svg';
import { UserContext } from './UserContext';
import Swal from 'sweetalert2';
import { BiUser, BiCommentDetail, 
  BiEdit, BiLogOut, BiLineChart, 
  BiBarChart, BiGrid } from "react-icons/bi";
import { TbBinaryTree } from "react-icons/tb";

function Navbar({ avatar, username }) {
  const [click, setClick] = useState(false);
  const [state, setState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setValue } = useContext(UserContext);
  const history = useHistory();
  const container = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (container.current && !container.current.contains(event.target)) {
        setState(false);
      }
    }

    function handleScroll() {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setState(false);
    setClick(false);
  };

  const handleButtonClick = () => setState(!state);

  const logOut = () => {
    Swal.fire({
      title: 'You are about to Log-Out',
      text: "Are you sure you want to log-out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B8336A',
      cancelButtonColor: '#333',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
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
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <img draggable="false" src={logoImage} alt='DSA' width={40} height={40} />
        DSA Visual
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>
          <BiBarChart/> Sorting
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/shortest-path-algorithms' className='nav-links' onClick={closeMobileMenu}>
          <BiGrid/> Path Finding
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/data-structures' className='nav-links' onClick={closeMobileMenu}>
          <TbBinaryTree/>Data Structures
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/quiz' className='nav-links' onClick={closeMobileMenu}>
          <BiEdit />Quiz
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/comments' className='nav-links' onClick={closeMobileMenu}>
          <BiCommentDetail/>Discussion
          </Link>
        </li>
        <li className='nav-item' ref={container}>
          {avatar ? (
            <button className="nav-links-button" onClick={handleButtonClick}>
              <img src={avatar} className="navavatar" alt="User Avatar" />
              <span>{username}</span>
            </button>
          ) : (
            <button className="nav-links-button" onClick={handleButtonClick}>
              <BiUser />
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
  const [state, setState] = useState(false);
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const container = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (container.current && !container.current.contains(event.target)) {
        setState(false);
      }
    }

    function handleScroll() {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const adminLogout = () => {
    localStorage.removeItem("adminusername");
  };

  return (
    <nav className={`navbar navbarb ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link to='/dashboard' className='navbar-logo' onClick={closeMobileMenu}>
        <img draggable="false" src={logoImage} alt='DSA' width={40} height={40} />
        DSA Admin
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/dashboard' className='nav-links backend-links' onClick={closeMobileMenu}>
            <BiLineChart />Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/manage-users' className='nav-links backend-links' onClick={closeMobileMenu}>
            <BiUser />Manage Users
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/manage-quiz' className='nav-links backend-links' onClick={closeMobileMenu}>
            <BiEdit />Manage Quiz
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/manage-discussion' className='nav-links backend-links' onClick={closeMobileMenu}>
            <BiCommentDetail />Manage Discussion
          </Link>
        </li>
        <li className='nav-item'>
          <a href="/admin" className="nav-links backend-links" onClick={adminLogout}>
            <BiLogOut />Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar, NavbarBackend };