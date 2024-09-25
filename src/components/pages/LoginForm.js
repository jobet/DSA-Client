import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import { useLocation, useParams, searchParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../UserDropDown';


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
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
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
    ReactSession.set("email", email);
    ReactSession.set("password", password);
    document.getElementById('log_email').value = ''
    document.getElementById('log_password').value = ''
    setValue(<LoginDropdown avatar={avatar} username={username}/>)
    forceUpdate();
    setLog_Password("")
    setLog_Email("")
    Axios.post(`${process.env.REACT_APP_API_URL}/api/avatar_get`,{
      Reg_email:email}).then((response)=>{
        getUserAvatar(response.data[0]["useravatar_url"], username);
      }) 
  }
  function getUserAvatar(useravatar, uname){
    ReactSession.set('avatar_display', useravatar);
    ReactSession.set("username", uname);
    forceUpdate();
  }

  const login_User = ()=>{
    let isConfirmed = false;
    let success = false;
    Axios.post(`${process.env.REACT_APP_API_URL}/api/userpass/check`, {
      Reg_email: log_Email, 
      Reg_password: log_Password
  }).then((response) => {
    console.log(response.data);
    if(response.data){
      if(response.data["correct_pass"] && response.data["confirmed"] == 'true'){
           correctPass_Confirmed(response.data["useravatar_url"], response.data["username_reg"], log_Email, log_Password)
           isConfirmed = true;
           success = true;
           console.log(response.data["correct_pass"])
           console.log(response.data["confirmed"])
         }
      else if(response.data["correct_pass"] && response.data["confirmed"] == 'false'){
          Swal.fire({
            icon: 'error',
            title: 'Email has not been confirmed'
          })
          document.getElementById('log_password').value = ''
          Axios.post(`${process.env.REACT_APP_API_URL}/api/fetch_user_infos`,{
            Reg_email:log_Email}).then((response)=>{setUserInfo(response.data)})
          dis(true)
      }
      else{
          Swal.fire({
            icon: 'info',
            title: 'Invalid Email or Password',
            text: 'Please input a valid email or password',
          })
          document.getElementById('log_password').value = ''
      }
    }
    else{
      alert("Email does not exist")
    }
  });
  }

  const [userInfo, setUserInfo] = useState([]);
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
          //setuserNameList(usernameList.map((val) => { 
          //  return  val.useremail_reg == log_Email?{useremail_reg:val.useremail_reg, username_reg:val.username_reg, userpassword_reg:val.userpassword_reg, useravatar_url:val.useravatar_url, confirmed:'true', code:val.code}:val
          //}))

          //correctPass_Confirmed('NaN', Reg_username, log_Email, Reg_password)
        })
      }
      else if ((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) != userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Code'
        })
        dis(true);
        // console.log('Confirm Code documentID: ',(document.getElementById('log_confirm_code').value),'Confirm Code state: ',code,'Log Email: ',log_Email)
      }
      else if (((log_Email.trim()) != userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false')){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Email'
        })
        dis(true);
        // console.log('Confirm Code documentID: ',(document.getElementById('log_confirm_code').value),'Confirm Code state: ',code,'Log Email: ',log_Email)
      }
    }
  }
  const forceUpdate = useForceUpdate();
return (
<div className='Home'>
         {(() => {
        if (ReactSession.get('username')){
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