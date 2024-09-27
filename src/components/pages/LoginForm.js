import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import { useLocation, useParams, searchParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';


//create your forceUpdate hook
function useForceUpdate(){
  const [valueUpdate, setValueUpdate] = useState(0); // integer state
  return () => setValueUpdate(valueUpdate => valueUpdate + 1); // update the state to force render
}
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function LoginForm() {
  let query = useQuery();
  let history = useHistory();
  
  const {value,setValue} = useContext(UserContext);
  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get(`${process.env.REACT_APP_API_URL}/api/get`).then((response)=>{
      setuserNameList(response.data)
      if(query.get("code") && query.get("email")){
        confirmUserParams(response.data, query.get("code"), query.get("email"))
      }
      else if(query.get("confirm")){
        setLog_Email(query.get("confirm"));
        dis(true);
        history.push("/login-form")
      }
    })
  },[]) //Calling it once
  const [usernameList, setuserNameList] = useState([])
  const [code, setCode] = useState("")
  const [enableSubmitCode, setEnableSubmitCode] = useState(false);

  const dis = (param) => {
    setEnableSubmitCode(param);
  }
  //Login
  const [log_Email, setLog_Email] = useState('')
  const [log_Password, setLog_Password] = useState('')

  function correctPass_Confirmed(avatar, username, email, password){ 
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
    localStorage.setItem('avatar_display', avatar);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    document.getElementById('log_email').value = ''
    document.getElementById('log_password').value = ''
    setValue(<Navbar avatar={localStorage.getItem('avatar_display')} username={localStorage.getItem('username')}/>)
    forceUpdate();
    setLog_Password("")
    setLog_Email("")
  }

  const login_User = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/api/userpass/check`, {
      Reg_email: log_Email, 
      Reg_password: log_Password
    }).then((response) => {
      console.log("Full server response:", JSON.stringify(response.data, null, 2));
  
      if (response.data && response.data.exists) {
        // Log individual fields for debugging
        console.log("correct_pass:", response.data.correct_pass);
        console.log("confirmed:", response.data.confirmed);
  
        if (response.data.correct_pass == true) {  // Using loose equality
          if (response.data.confirmed == "true") {  // Using loose equality
            console.log("Login successful");
            correctPass_Confirmed(response.data.useravatar_url, response.data.username_reg, log_Email, log_Password);
          } else {
            console.log("Email not confirmed");
            Swal.fire({
              icon: 'error',
              title: 'Email has not been confirmed'
            });
            document.getElementById('log_password').value = '';
            dis(true);
          }
        } else {
          console.log("Incorrect password");
          Swal.fire({
            icon: 'info',
            title: 'Invalid Password',
            text: 'Please input the correct password',
          });
          document.getElementById('log_password').value = '';
        }
      } else {
        console.log("Email does not exist");
        Swal.fire({
          icon: 'error',
          title: 'User not found',
          text: 'The email you entered does not exist in our records.',
        });
      }
    }).catch(error => {
      console.error("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred during login. Please try again later.',
      });
    });
  };
  //Confirm User From Link
  function confirmUserParams(userlist, confirmcode, email){
    Swal.fire('Confirming E-mail Address...')
    let i;
    let userNamesConfirmCode = userlist.map((val) => [val.useremail_reg, val.code, val.confirmed, val.userpassword_reg, val.username_reg]);
    for (i=0;i<userNamesConfirmCode.length;i++){
      if(email == userNamesConfirmCode[i][0] && confirmcode == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'true'){
          Swal.fire({
            icon: 'success',
            title: 'Account already Confirmed! You can now Log-in.'
          })
          break;
      }
      else if(email == userNamesConfirmCode[i][0] && confirmcode == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        Axios.put(`${process.env.REACT_APP_API_URL}/api/confirm/update`,{
          log_Email: email,
          confirm:'true',
        }).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Account Confirmed! You can now Log-in.'
          })
        })
        break
      }
      else if((userNamesConfirmCode.length-1) == i){
        Swal.fire({
          icon: 'error',
          title: 'Invalid Parameters'
        })
      }
    }
}
  //Confirm User
  const confirm_User = () => {
    let i;
    let userNamesConfirmCode = usernameList.map((val) => [val.useremail_reg, val.code, val.confirmed]);
    for (i=0;i<userNamesConfirmCode.length;i++){
      if((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'true'){
        Swal.fire({
          icon: 'success',
          title: 'Account already Confirmed! You can now Log-in.'
        })
        dis(false)
      }
      else if((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        Axios.put(`${process.env.REACT_APP_API_URL}/api/confirm/update`,{
          log_Email: log_Email,
          confirm:'true',
        }).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Account Confirmed! You can now Log-in.'
          })
          document.getElementById('log_confirm_code').value = ''
          dis(false);
        })
      }
      else if ((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) != userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Code'
        })
        dis(true);
      }
      else if (((log_Email.trim()) != userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false')){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Email'
        })
        dis(true);
      }
    }
  }
  const forceUpdate = useForceUpdate();
return (
<div className='Home'>
         {(() => {
        if (localStorage.getItem('username')){
          history.push("/profile");
        }
        else if (enableSubmitCode == true) {
          return (
            <div className='box1-login'>
              
              <div className='login_form'>
                <h1 className='log_h1' style={{color:'teal'}}>Confirm Code</h1>
                <br></br>
                <div className='logbox'>
                    <center>
                      {/* {document.getElementById("log_email").value = log_Email} */}
                     <input type="email" placeholder="Enter Email" value={log_Email} name="email" id="log_email" onChange={(e) => {
                        setLog_Email(e.target.value)
                      }} ></input>
                      </center>
                      <center>
         
                      <input type="text" placeholder="Enter Confirmation Code" name="confirm" id="log_confirm_code" onChange={(e) => {
                         setCode(e.target.value)
                      }} ></input>
                    </center>
                
                </div>
                    <center><button style={{width:'auto'}} onClick={confirm_User}>Submit Code</button></center>
              
             <br></br>
             </div>
             </div>
        )
      }
        else{
          return (
          <div className='box1-login'>
          <div className='login_form'>
            <h1 className='log_h1'>Login to Your Account</h1><br/><br/><br/>
            
              
              <div className='logbox'>
                <center>

                  <input placeholder="Enter Email" type="email" name="email" id="log_email" onChange={(e) => {
                     setLog_Email(e.target.value)
                  }} ></input>
                </center>
              </div>
              <div>
                <center>

                  <input type="password" placeholder="Enter Password" name="password" id="log_password" onChange={(e) => {
                     setLog_Password(e.target.value)
                  }} ></input>
                </center>
              </div>
              <center><button className="loginPageButton" onClick={login_User}>Login</button>
              <br></br>
              <Link to="/register-form"><button className="buttonRegLog">Don't have an account?</button></Link></center>
            </div>
          </div>
        )
        }
        
      })()}
          
        </div>
  )
}

export default LoginForm;