import React, { useState, useRef, useEffect, useContext } from 'react';
import {UserContext} from './UserContext';
import './Navbar.css';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';

function LoginDropdown(data){
    let history = useHistory();
    const container = useRef(null);
    useOutsideAlerter(container);
    const [state, setState] = useState(false);
    const {value,setValue} = useContext(UserContext);
    const [enableSubmitCode, setEnableSubmitCode] = useState(false);
    const forceUpdate = useForceUpdate();
    const dis = (param) => {
        setEnableSubmitCode(param);
    }
    function useForceUpdate(){
        const [valueUpdate, setValueUpdate] = useState(0); // integer state
        return () => setValueUpdate(value => value + 1); // update the state to force render
    }
    useForceUpdate();
    function logOut(){
        Swal.fire({
          title: 'Are you sure you?',
          text: "Logout?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText:'No'
        }).then((result) => {
          if (result.isConfirmed) {
            ReactSession.remove("username");
            ReactSession.remove("email");
            ReactSession.remove("password");
            ReactSession.remove("avatar_url");
            ReactSession.remove("avatar_display");
            {setValue(<LoginDropdown/>)}
            dis(false);
            forceUpdate();
            history.push("/login-form");
          }
        })
      }
    
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
           function handleClickOutside(event){
            if (
              container.current &&
              !container.current.contains(event.target)
            ) {
              setState(false);
            }
        }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
    const handleButtonClick = () =>{
        setState(!state);
    }
    if(data.avatar == undefined){
        return(
            <li className="nav-item">
            <div className="container" ref={container}>
            <Link className="nav-links" onClick={handleButtonClick}>
            <span className="navbicon"><BiUser/> </span>Login
            </Link>
            {state ?
            <div class="dropdown">
                <ul>
                <h3>Log in or Register to join our discussion board and to take the daily quiz!</h3>
                <Link to='/login-form' onClick={handleButtonClick} className="dropdownlinks"><li>Login</li></Link>
                <Link to='/register-form' onClick={handleButtonClick} className="dropdownlinks"><li>Register</li></Link>
                </ul>
            </div>
             : null}
            </div>
            </li>
        )
    }
    else{
        return(
            <li className='nav-item'>
            <div className="container" ref={container}>
            <Link className="nav-links" onClick={handleButtonClick}><span>
            <img src={data.avatar} className="navavatar"/> {data.username}</span></Link>
            {state ?
            <div class="dropdown">
            <ul>
                <Link to='/profile' className="dropdownlinks"><li><img src={data.avatar} width={80}/>
                <h2>{data.username}</h2></li></Link>
                <Link to='/profile' className="dropdownlinks"><li>Profile</li></Link>
                <Link to='/score-page' className="dropdownlinks"><li>Scores</li></Link>
                <Link onClick={logOut} className="dropdownlogout"><li>Logout</li></Link>
            </ul>
            </div>
            : null}
            </div>
            </li>
        )
    }
}
export {LoginDropdown}