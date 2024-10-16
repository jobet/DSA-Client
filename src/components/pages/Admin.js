import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import logoImage from '../images/logo.svg';

function Admin() {
  const {value,setValue} = useContext(UserContext);
  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/get`).then((response)=>{
      setuserNameList(response.data)
    })
  },[]) //Calling it once


    //Admin Login
  const [log_AdminUsername, setlog_AdminUsername] = useState('')
  const [log_AdminPassword, setlog_AdminPassword] = useState('')
  const [usernameList, setuserNameList] = useState([])


  const login_User = ()=>{
    let isConfirmed = false;
    let success = false;
    let i;
    let userNamesPasswordConfirmed = usernameList.map((val) => [val.admin_username, val.admin_password])
    console.log(userNamesPasswordConfirmed)

    console.log(log_AdminUsername, log_AdminPassword)
    if(log_AdminUsername != null && log_AdminPassword!= null)
      for (i=0;i<userNamesPasswordConfirmed.length;i++){
        if((log_AdminUsername+log_AdminPassword == userNamesPasswordConfirmed[i][0]+userNamesPasswordConfirmed[i][1])){
          
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          isConfirmed = true;
          success = true;
          
          document.getElementById('log_AdminUsername').value = ''
          document.getElementById('log_AdminPassword').value = ''
          localStorage.setItem("adminusername", userNamesPasswordConfirmed[i][0]);
          setlog_AdminPassword("")
          setlog_AdminUsername("")

          window.location.href = "/dashboard";
        }
        else if ((log_AdminPassword != userNamesPasswordConfirmed[i][1]) || (log_AdminUsername != userNamesPasswordConfirmed[i][0]))
        {
          Swal.fire({
            icon: 'info',
            title: 'Invalid Username or Password',
            text: 'Please input a valid username or password.',
          })
          document.getElementById('log_AdminPassword').value = ''
        }
    }
  }
  if(localStorage.getItem("adminusername")) window.location.href = "/dashboard";
  else{
    return (
      <div className="AdminPage">
              <div className='backendform'>
                <div className="backendFormLogo">
                  <img src={logoImage} draggable={false} className="adminPanelLogo"/>
                  <h1 className="siteTitle">DSA Admin</h1>
                </div>
                <div className="backendFormInput">
                  <input className="backendinput" placeholder="Username" type="email" name="email" id="log_AdminUsername" onChange={(e) => {
                      setlog_AdminUsername(e.target.value)
                  }}/>
                  <input className="backendinput" type="password" placeholder="Password" name="password" id="log_AdminPassword" onChange={(e) => {
                      setlog_AdminPassword(e.target.value)
                  }}/>
                  <button onClick={login_User}>
                    Login
                  </button>
                </div>
              </div>
        </div>
    )
  }
}

export default Admin;
