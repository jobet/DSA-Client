import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BiSolidCircle } from "react-icons/bi";


export default function Comment(){
  let history = useHistory();
  const {value,setValue} = useContext(UserContext);
    const [comment,setcomment]=useState("");
    const [username,setusername]=useState(localStorage.getItem('email'));
    const [commentID,setcommentID]=useState(0);
    const [userid,setuserid]=useState("");
    const [newComment,setnewComment]=useState("");
    const [dis, setDis] = useState(true);
    const [open, setOpen] = useState(false);
    const [clickedID, setClickedID] = useState(0);
    const [cardIndex, setCardIndex] = useState(null);
    const [tempCommentID, setTempCommentID] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const [editCount, setEditCount] = useState(0);
    const [commentList,setcommentList]=useState([]);
    const [replies, setReplyList] = useState([]);
    const [backupCommentList, setBackupCommentList] =useState([])
    const [replyValue, setReplyValue] = useState("")
    const [highestReplyID, setHighestReplyID] = useState(9900)
    const [highestCommentID, setHighestCommentID] = useState(1)
    const [replyCardIndex, setReplyCardIndex] = useState(null);
    const [commentReplyIndex, setCommentReplyIndex] = useState(null)
    const [editReplyValue, setEditReplyValue] = useState("")

    //get comment and replies
    useEffect(() => {
      Axios.post(`${process.env.REACT_APP_API_URL}/api/reply_get`).then((response)=>{
        setReplyList(response.data);

    });
        Axios.get(`${process.env.REACT_APP_API_URL}/api/comment/get`).then((response)=>{
        setcommentList(response.data);
    });
    } , [])

    //append replies to comment
    useEffect(() => {
      // console.log(replies)
  } , [commentList])

    useEffect(() => {
     if (commentList.length){
        setBackupCommentList([...commentList])
     }
  } , [commentList])


  function submitReply(replyMessage, comm_ID){
    {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var dateTimeSQL = date+' '+timeSQL;
        Axios.post(`${process.env.REACT_APP_API_URL}/api/reply_insert`, {
            Reg_email:localStorage.getItem("email"),
            Reply_content:replyMessage,
            Reply_written: dateTimeSQL,
            Comment_ID:comm_ID
        })
      setReplyList([...replies,{"reply_id":highestReplyID,"reply_written":dateTime,"comment_id":comm_ID,
      "useravatar_url":localStorage.getItem("avatar_display"),"useremail_reg":localStorage.getItem("email"),
    "reply_content":replyMessage,"username_reg":localStorage.getItem("username")}])
      setHighestReplyID(highestReplyID+1)
      };
      setShow(false)
      setReplyValue("")

  }

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

//submit comment
    async function submitComment () {
      console.log(commentID)
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var timeSQL = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTimeSQL = date+' '+timeSQL;
      var dateTime = date+' '+time;
        await Axios.post(`${process.env.REACT_APP_API_URL}/api/comment/insert`, {
            useremail_reg:username,
            comment_text:comment,
            date_written: dateTimeSQL,
        })
        await Axios.get(`${process.env.REACT_APP_API_URL}/api/comment/comment_id/get`).then((response)=>{
          if(commentID == null){
            setcommentList([...commentList,
              {
                comment_id: highestCommentID,
                useremail_reg: localStorage.getItem("email"),
                comment_text: comment,
                date_written: dateTime,
                user_infos: {
                  useravatar_url: localStorage.getItem('avatar_display'),
                  username_reg: localStorage.getItem("username"),
                  useremail_reg: localStorage.getItem("email")
                }
              }])
            setHighestCommentID(highestCommentID+1)
          }
          else {
            setcommentList([
              ...commentList,
              {
                comment_id: ((response.data)[0].comment_id+1),
                useremail_reg: username,
                comment_text: comment,
                date_written: dateTime,
                user_infos: {
                  useravatar_url: localStorage.getItem('avatar_display'),
                  username_reg: localStorage.getItem("username"),
                  useremail_reg: username
                }
              },
            ]);
          }
        }) 
      setCommentCount(commentCount + 1)
      setShow(false)
      setReplyValue(" ")
      };

      
    

    function submit(){
      submitComment();
      setcomment("");
    }

    function Login(){
      history.push("/login-form");
    }

    function Register(){
      history.push("/register-form");
    }


    function convertDate(date){
      let finalDate = "";
      var seconds = Math.floor((new Date() - date) / 1000);
      if ((seconds / 31536000) > 1) {
          finalDate = Math.floor(seconds / 31536000) + " year";
          if (Math.floor(seconds / 31536000) != 1) finalDate += "s";
      }
      else if ((seconds / 2592000) > 1) {
          finalDate = Math.floor(seconds / 2592000) + " month";
          if (Math.floor(seconds / 2592000) != 1) finalDate += "s";
      }
      else if ((seconds / 86400) > 1) {
          finalDate = Math.floor(seconds / 86400) + " day";
          if (Math.floor(seconds / 86400) != 1) finalDate += "s";
      }
      else if ((seconds / 3600) > 1) {
          finalDate = Math.floor(seconds / 3600) + " hour";
          if (Math.floor(seconds / 3600) != 1) finalDate += "s";
      }
      else if ((seconds / 60) > 1) {
          finalDate = Math.floor(seconds / 60) + " minute";
          if (Math.floor(seconds / 60) != 1) finalDate += "s";
      }
      else{
          finalDate = Math.floor(seconds) + " second";
          if (Math.floor(seconds) != 1) finalDate += "s";
      }
      return finalDate+" ago";
    }


    function deleteReply(id){
      Swal.fire({
        title: 'Are you sure you?',
        text: "Submit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {

            const updatedReplies = replies.filter(val => val.reply_id != id);
            //setDeleteCount(deleteCount + 1);
            setReplyList([...updatedReplies]);
         Axios.delete(`${process.env.REACT_APP_API_URL}/api/user_reply/delete/${id}`)

        }

      })
    }


    const deleteComment=(id)=>{
      Swal.fire({
        title: 'Are you sure you want to delete this comment?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        cancelButtonText:'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`${process.env.REACT_APP_API_URL}/api/comment/delete/${id}`)
            const updatedBackendComments = commentList.filter(val => val.comment_id != id);
            //setDeleteCount(deleteCount + 1);
            setcommentList([...updatedBackendComments]);
         Axios.delete(`${process.env.REACT_APP_API_URL}/api/reply/delete/${id}`)
        }
      })
      
      
  
    }

    const updateComment=(comment_id)=>{
      Swal.fire({
        title: 'Are you sure you want to update this comment?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        cancelButtonText:'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.put(`${process.env.REACT_APP_API_URL}/api/comment/update`,{
            comment_text: newComment,
            comment_id: comment_id,
          } )
          //setEditCount(editCount + 1);
          const updatedcomm=setcommentList(commentList.map((val) => {   //maps comment for updating
            return val.comment_id == comment_id?{comment_id:val.comment_id,useravatar_url:val.useravatar_url,useremail_reg:val.useremail_reg,comment_text:newComment,date_written:val.date_written}:val
          }))           
        setDis(!dis);
        }
      })
     
    }

    const [show, setShow] = useState(false);
    const [editReplyShow, setEditReplyShow] = useState(false);   
    const editing=(val)=>{
      setTempCommentID(val.comment_id)
      setDis(!dis);
      } 
    

      function handleCardIndex(index){
        setCardIndex(index)
        if (show)
           setShow(false)
        else
           setShow(true)
      }

      
      function handleReplyCardIndex(index, commID){
        setCommentReplyIndex(commID)
        setReplyCardIndex(index)
          if(editReplyShow)
          setEditReplyShow(false)
          else
          setEditReplyShow(true)
      }

      function editReply(replyID){
        
        Swal.fire({
          title: 'Are you sure you?',
          text: "Submit?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'No',
          cancelButtonText:'Yes'
        }).then((result) => {
          if (!result.isConfirmed) {
            Axios.put(`${process.env.REACT_APP_API_URL}/api/reply/update`,{
              Reply_value: editReplyValue,
              Reply_id: replyID,
  
            } )
            //setEditCount(editCount + 1);
            const updateReply = setReplyList(replies.map((val) => {   //maps replies for updating
              return val.reply_id == replyID?{reply_id:val.reply_id,reply_written:val.reply_written,comment_id:val.comment_id
                ,useravatar_url:val.useravatar_url,useremail_reg:val.useremail_reg,reply_content:editReplyValue,username_reg:val.username_reg}:val
            }))


         
            setEditReplyShow(false)

          }
        })
      }




     return(
        <div className="DiscussionBoard">
          <div className="DiscussionBox">
            <h1 style={{textAlign:"center"}}>Discussion Board</h1>
            <div className="commentform">

      {(() => {
        if (localStorage.getItem("username") && commentCount == 2){
          return (
            <div className="commentform">
                <h2>{localStorage.getItem("username")}</h2>
                <h2>Adding comments is restricted to 2 at a time</h2>
            </div>
          )
        }
        else if (localStorage.getItem("username")) {
          return (
            <div className="commentform">
              <center><h2>{localStorage.getItem("username")}</h2>
              <img className='usericon' width={'80px'} height={'80px'}src={localStorage.getItem("avatar_display")}></img>
              </center>
            <input type="text" name="comment" value={comment} placeholder="Type a response" onChange={(e)=>{setcomment(e.target.value)}}/>
           <button onClick={submit}  >Submit</button>
            </div>
          )
        } else {
          return (
            <div className="commentform">
              <h3>Login to join the discussion!</h3>
              <div className="buttonArea">
                <button onClick={Register}>Register</button>
                <button onClick={Login}>Login</button>
              </div>
            </div>
          )
        }
      })()}
                
            </div>
            <div className="cardholder">
        {(() => { 
          if (!commentList.length){
            console.log('comment list was emptied')
            // console.log(backupCommentList)
            setcommentList([...backupCommentList])
          }
        })}
            {
            commentList
            .map((val)=>{
               return (
                <div className="card">
                  {(() => {
          console.log(val);
          return (
            <>
            <div className="comment">
              <div className="commentHeader">
                <img className='usericon' 
                width={'50px'} 
                height={'50px'}
                src={val.user_infos.useravatar_url}
                />
                <h2 className='user' value={userid}>
                  {val.user_infos.username_reg}
                </h2>
                <BiSolidCircle className="userDateSeparator"/> 
                <span>
                  {convertDate(new Date(val.date_written))}
                </span>
              </div>
              <div className="commentBody">
                <p className="commentmsg">
                  {val.comment_text}
                </p>
              </div>
            </div>  
            </>
          )
      })()}
{(() =>{
  if (value != "Login/Register"){
    return(
      <div>
        
      </div>
    )
  }
})}
            {(() => {
        if (val.user_infos.useremail_reg == localStorage.getItem("email") && deleteCount==2 && editCount==2){
          return (
            <div className="actionArea">
              <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
              <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            </div>
          )
        }
        
        else if (val.user_infos.useremail_reg == localStorage.getItem("email")) {
          return (
            <div className="actionArea">    
            <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
            <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            <button className='commentbtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
            <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
            <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
            </div>
            </div>
          )
        } 
        else if (localStorage.getItem("username")){
          return(
            <div>
               <button className='replybtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
            <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
            <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
            </div>
            </div>
          )
        }
             
      })()}
      
      {(() => {
              if (tempCommentID == val.comment_id && dis==false && val.useremail_reg == localStorage.getItem("email") ){
                return(
                  <div>
                    <input type='text' id='editText'  className='updateinput' onChange={(e)=>{setnewComment(e.target.value)}}/>
                    <div>Edit Mode: Enabled<button id='submitEditBtn' className='commentbtn' onClick={()=>{updateComment(val.comment_id)}}>Confirm</button></div>

                  </div>
                )
              }
            })()}


{/* Replies */}

<>
        {replies.map((item) => (
          <>

            {item.comment_id == val.comment_id ? <div className="replyholder2">{convertDate(item.reply_written) == "Invalid Date" ? "" :    
            <>
            <div className="comment">
              <div className="commentHeader">
                <img 
                src={item.user_infos.useravatar_url} 
                width="30px" 
                height="30px"
                />
                <label className="replyuser">
                  {item.user_infos.username_reg}
                </label>
                <BiSolidCircle className="userDateSeparator"/> 
                <span>
                  {convertDate(new Date(item.reply_written))}
                </span>
              </div>
              <div className="replyBody">
                <span className="replymsg">
                  {item.reply_content}
                </span>
              </div>
            </div>
            
            </>}

            {item.useremail_reg == localStorage.getItem("email") ?
            <div className="actionArea">
              <button className='replybtn' onClick={() => handleReplyCardIndex(item.reply_id)}>Edit</button>
              <button className='replybtn' onClick={()=>{deleteReply(item.reply_id)}}>Delete</button>
              <div className={item.reply_id == replyCardIndex && editReplyShow ? 'reply_shown' : 'reply_hidden'}>
                <input value={editReplyValue} placeholder="Edit Reply" onChange={(e) => {setEditReplyValue(e.target.value)}} type="text"></input> <button onClick={() => editReply(item.reply_id)} className='replybtn'>Confirm</button>
              </div>
            </div> : ""}

            
          </div>:"" }
          
          </>
        ))}</>
              </div>

               
               )

          
            })}
            
            </div>
            </div>
        </div>
     )
     
  
}




