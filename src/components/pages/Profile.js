import React, { useState, useContext } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import {AvatarGenerator} from './generator_avatar.ts';
import { useHistory } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../UserDropDown';

const generator = new AvatarGenerator();

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
function Profile() {
  let history = useHistory();
  
  const {value,setValue} = useContext(UserContext);

  //Registration
  const [usernameList, setuserNameList] = useState([])
  const [avatar_url, set_avatar] = useState("");
  const [enableSubmitCode, setEnableSubmitCode] = useState(false);
  const [backUpUserList, setBackupUserList] = useState([])
  const dis = (param) => {
    setEnableSubmitCode(param);
  }


  const forceUpdate = useForceUpdate();

   function logOut(){
    Swal.fire({
      icon: 'error',
      title: 'Logged out'
    })
    
  
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


  function changeAvatar(){
    let new_avatar = generator.generateRandomAvatar()
    set_avatar(new_avatar)
    ReactSession.set("avatar_display",new_avatar)
    Axios.put('http://localhost:3001/api/avatar/update',{
            Reg_email: ReactSession.get('email'),
          Reg_avatar_url: new_avatar} )
  }

  function changePassword(){
    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Enter New Password',
        html:
          'New Password'+'<input type="password" id="swal-input1" class="swal2-input">' + ' <br></br> ' +'Re-Enter New Password' +
          '<input type="password" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      
      if(formValues)
        if (formValues[0] && formValues[1]) {
           let newPass = formValues[0]
           let re_EnterPass = formValues[1]
           if(newPass == re_EnterPass){
             if(newPass.length < 5 || re_EnterPass.length < 5)
                Swal.fire("Password's length must be at least be 5")
            else{
              ReactSession.set("password", newPass)
              Axios.put('http://localhost:3001/api/userpass/update',{
              Reg_email: ReactSession.get("email"),
              Reg_password: re_EnterPass
             } )
             forceUpdate();
            }
          }
          else
              Swal.fire("Passwords do not match")
        }
      else
        Swal.fire("Please enter a value for both fields")
      
      })()
  }

  function changeName(){
    (async () => {
      const { value: userName } = await Swal.fire({
        title: 'Enter New Username',
        input: 'text',
        inputLabel: 'Username',
        inputPlaceholder: 'Enter new username',
        inputAttributes: {
          maxlength: 20,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (userName) {
        Axios.put('http://localhost:3001/api/username/update',{
              Reg_username: userName,
              Reg_email: ReactSession.get("email")
             } )
             {setValue(<LoginDropdown avatar={ReactSession.get('avatar_display')} username={userName}/>)}
             ReactSession.set("username", userName)
        forceUpdate();
      }
      else
        Swal.fire("Username cannot be blank")
      
      })()
  }

  function enterScoreList(){
    history.push("/score-page");
  }

  function deleteAccount(){
    Swal.fire({
      title: 'Delete Account?',
      text: "This will delete every info including comments and replies from the account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/api/username/delete/${ReactSession.get("email")}`);
          setBackupUserList(usernameList.filter(val => val.useremail_reg != ReactSession.get("email")));
          setuserNameList([...backUpUserList]);

       Axios.delete(`http://localhost:3001/api/user_comment/delete/${ReactSession.get("email")}`);
       Axios.delete(`http://localhost:3001/api/user_reply/delete/:${ReactSession.get("email")}`);
       ReactSession.remove("username");
       ReactSession.remove("email");
       ReactSession.remove("password");
       ReactSession.remove("avatar_url");
       ReactSession.remove("avatar_display");
       {setValue(<LoginDropdown/>)}
       dis(false);
       forceUpdate();
            Swal.fire(
              'Deleted!',
              'Your account has been deleted.',
              'success'
            )
        history.push("/login-form");
      }
    })
      }
    })
  }

  return (
<div className='Home'>
         {(() => {
        if (ReactSession.get('username')){
          return (
            <div className='box1-login'>
              <div className='login_form'>
                <center>
                <img className='usericon' width={'120px'} height={'120px'} src={ReactSession.get('avatar_display')}></img>
                  <h1>Username: {ReactSession.get('username')}</h1>
                     <h1>Email: {ReactSession.get('email')}</h1>
                     {/* <h1>Password: {ReactSession.get('password')}</h1> */}

                     <button onClick={changeName}>Change Username</button>
                     <button onClick={changePassword}>Change Password</button>
                     <button onClick={changeAvatar}>Change Avatar</button>
                     <button onClick={enterScoreList}>Score List</button>
                     <br></br>
                     <button onClick={logOut}>Logout</button>
                     <br></br>
                     <br></br>
                     <br></br>
                     <button onClick={deleteAccount}>Delete Account</button>
                </center>
              </div>
            </div>
          )
        }  
        else{
            history.push("/login-form");
        }
        
      })()}   
        </div>
  )
}

export default Profile;