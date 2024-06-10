import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {AvatarGenerator} from './generator_avatar.ts';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const generator = new AvatarGenerator();

function RegisterForm() {
    let history = useHistory();

  function validateEmail (emailAdress)
  {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }

  //Registration
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [Confirm_password, setConf_password] = useState('')
  const [Reg_email, setReg_email] = useState('')
  const [Reg_gender, setReg_gender] = useState('')
  const [Reg_program, setReg_program] = useState('')
  const [Reg_yearlevel, setReg_yearlevel] = useState('')
  const [usernameList, setuserNameList] = useState([])
  const [confirmed, setConfirmed] = useState("false");
  const [enableSubmitCode, setEnableSubmitCode] = useState(false);
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setuserNameList(response.data)
    })
  },[])
  const dis = (param) => {
    setEnableSubmitCode(param);
  }
  const registerUser = () =>{
    if (document.getElementById('reg_user_input').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter a username.',
    })
    else if (document.getElementById('reg_email').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter an email.',
    })
    else if (document.getElementById('reg_gender').value == 'selectgender')
    Swal.fire({
      icon: 'info',
      title: 'No Selection',
      text: 'Select a Gender.',
    })
    else if (document.getElementById('reg_program').value == 'selectprogram')
    Swal.fire({
      icon: 'info',
      title: 'No Selection',
      text: 'Select a Program.',
    })
    else if (document.getElementById('reg_yearlevel').value == 'selectyear')
    Swal.fire({
      icon: 'info',
      title: 'No Selection',
      text: 'Select a Year Level.',
    })
    else if (document.getElementById('reg_user_pass').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter a password.',
    })
    else{
    let emails = usernameList.map((val)=> val.useremail_reg)

    //Validation of email PK
    if(emails.includes(Reg_email)){
    Swal.fire({
      icon: 'error',
      title: 'Email already taken',
      text: 'Enter another email.',
    })
    document.getElementById('reg_email').value = ''
  }
    
    else{
      if(Reg_username.length < 3)
        Swal.fire({
          icon: 'info',
          title: 'Name is too short',
          text: 'Username must be greater than 3',
        })
      
      else if(Reg_password.length < 5)
          Swal.fire({
      icon: 'info',
      title: 'Password is too short',
      text: 'Password length must be greater than 5.',
    })
    else if(!validateEmail(Reg_email))
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Enter a valid email',
    })
    else if(Reg_password!=Confirm_password){
      Swal.fire({
        icon: 'info',
        title: 'Password Unmatch',
        text: 'Please input matching password',
      })
    }
    else{
    //Call the api using Axios
    //Generate Random Code for E-Mail Confirmation
    let new_avatar = generator.generateRandomAvatar()
    // set_avatar(new_avatar)

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTimeSQL = date+' '+timeSQL;

    ReactSession.set("avatar_url", new_avatar)
    const min = 100000;
    const max = 1000000;
    const rand = String(Math.round(min + Math.random() * (max - min)));
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username,
      Reg_email: Reg_email, 
      Reg_password: Reg_password,
      Reg_avatar_url: new_avatar,
      confirmed: confirmed,
      code: rand,
      user_created: dateTimeSQL,
      usergender_reg: Reg_gender,
      userprogram_reg: Reg_program,
      useryear_reg: Reg_yearlevel
  });
  setuserNameList([
    ...usernameList,
    { useremail_reg: Reg_email,
      username_reg: Reg_username, 
      userpassword_reg: Reg_password,
      confirmed: confirmed,
      code: rand,
      },
  ])

  Axios.post('http://localhost:3001/api/fetch_user_infos',{
    Reg_email:Reg_email}).then((response)=>{setUserInfo(response.data)})

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Registration Successful! \n\nPlease confirm \nyour E-mail and \nenter your \nconfirmation code'
  })
  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  document.getElementById('reg_email').value = ''
  document.getElementById('confirm_user_pass').value =''
  window.location.href = "/login-form?confirm="+Reg_email;
  //Sending Confirmation E-mail
  try{
    Axios.post('http://localhost:3001/api/sendemail', {
        code: rand,
        email: Reg_email,
    });
  }
  catch{
    console.log('Invalid E-mail')
  }
  dis(true);
  
}
    }
  };

}
  const [userInfo, setUserInfo] = useState([]);
    return (

        <div className='Home'>
         {(() => {
        if (ReactSession.get('username')){
            history.push("/profile");
        }
        else{
          return (
            <div className='box1-login'>
            <div className='login_form'>
            <h1 className='log_h1'>Create an Account</h1>
                <br/>
                <center>
                  <input type="text" name="Reg_username" placeholder="Enter Username" id="reg_user_input" onChange={(e) => {
                     setReg_username(e.target.value)
                  }} ></input>
                <br/>    
                  <input type="email" name="Reg_email" placeholder="Enter Email" id="reg_email" onChange={(e) => {
                     setReg_email(e.target.value)
                  }} ></input>
                <br/>
                <select id="reg_gender" name="Reg_gender" onChange={(e) => {
                     setReg_gender(e.target.value)
                  }} >
                <option value="selectgender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option></select>
                <br/>
                <select id="reg_program" name="Reg_program" onChange={(e) => {
                     setReg_program(e.target.value)
                  }} >
                <option value="selectprogram">Select CCIS Program</option>
                <option value="BSCS">B.S. Computer Science</option>
                <option value="BSIS">B.S. Information Systems</option>
                <option value="BSIT">B.S. Information Technology</option>
                <option value="Others">I am not a CCIS Student</option></select>
                <br/>
                <select id="reg_yearlevel" name="Reg_yearlevel" onChange={(e) => {
                     setReg_yearlevel(e.target.value)
                  }} >
                <option value="selectyear">Select Year Level</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="Others">I am not a student</option></select>
                <br/>
                  <input type="password" placeholder="Enter Password" name="Reg_password" id="reg_user_pass" onChange={(e) => {
                     setReg_password(e.target.value)
                  }} ></input>
                <br/>
                  <input placeholder="Confirm Password" type="password" name="Confirm_password" id="confirm_user_pass" onChange={(e) => {
                     setConf_password(e.target.value)
                  }} ></input>
              <center><button className="registerPageButton" onClick={registerUser}>Register</button></center>
              <Link to="/login-form"><button className="buttonRegLog">Already have an account?</button></Link></center>
            </div>
          </div>
          )
        }
      })()}
        </div>
  )
}

export default RegisterForm;