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
  const [show, setShow] = useState(false);
  const [editReplyShow, setEditReplyShow] = useState(false);   
  const [editCommentShow, setEditCommentShow] = useState(false);
  const [addNewComment, setAddNewComment] = useState(false);
  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_API_URL}/api/reply_get`).then((response)=>{
      setReplyList(response.data);
  });
      Axios.get(`${process.env.REACT_APP_API_URL}/api/comment/get`).then((response)=>{
      setcommentList(response.data);
  });
  } , [])
  useEffect(() => {
    if (commentList.length){
      setBackupCommentList([...commentList])
    }
  } , [commentList])
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
  async function submitComment () {
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
      }) 
    setCommentCount(commentCount + 1)
    setShow(false)
    setReplyValue("")
  }
  const deleteComment=(id)=>{
    Swal.fire({
      title: 'Deleting Comment',
      text: "Are you sure you want to delete this comment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B8336A',
      cancelButtonColor: '#333',
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
  const updateComment = (comment_id) => {
    Swal.fire({
      title: 'Updating Comment',
      text: "Are you sure you want to update this comment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B8336A',
      cancelButtonColor: '#333',
      confirmButtonText: 'Yes',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`${process.env.REACT_APP_API_URL}/api/comment/update`, {
          comment_text: newComment,
          comment_id: comment_id,
        }).then(() => {
          // Update the local state
          setcommentList(prevComments => prevComments.map(comment => {
            if (comment.comment_id === comment_id) {
              return { ...comment, comment_text: newComment };
            }
            return comment;
          }));
        });
        setDis(!dis);
        setEditCommentShow(false);
      }
    });
  }
  const editing=(val)=>{
    setShow(false);
    setEditReplyShow(false);
    setEditCommentShow(true);
    setTempCommentID(val.comment_id)
    setnewComment(val.comment_text);
    setDis(!dis);
  } 
  async function submitReply(replyMessage, comm_ID){
    setShow(false);
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var timeSQL = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTimeSQL = date+' '+timeSQL;
      var dateTime = date+' '+time;
      await Axios.post(`${process.env.REACT_APP_API_URL}/api/reply_insert`, {
            Reg_email:localStorage.getItem("email"),
            Reply_content:replyMessage,
            Reply_written: dateTimeSQL,
            Comment_ID:comm_ID
        })
      await Axios.post(`${process.env.REACT_APP_API_URL}/api/reply_get`).then((response)=>{
          setReplyList(response.data);
      }).then((response)=>{
        setReplyList([
          ...replies,
          {
            reply_id: ((response.data)[0].reply_id+1),
            reply_written: dateTime,
            reply_content: replyMessage,
            comment_id: comm_ID,
            user_infos: {
              useravatar_url: localStorage.getItem('avatar_display'),
              username_reg: localStorage.getItem("username"),
              useremail_reg: localStorage.getItem("email"),
            }
          }
        ]);
      })
      setReplyValue("")
  }
  function deleteReply(id){
    Swal.fire({
      title: 'Deleting Reply',
      text: "Are you sure you want to delete this reply?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B8336A',
      cancelButtonColor: '#333',
      confirmButtonText: 'Yes',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
          const updatedReplies = replies.filter(val => val.reply_id != id);
          //setDeleteCount(deleteCount + 1);
          setReplyList([...updatedReplies]);
        Axios.delete(`${process.env.REACT_APP_API_URL}/api/user_reply/delete/${id}`)

      }

    })
  }
  function editReply(replyID) {
    Swal.fire({
      title: 'Updating Reply',
      text: "Are you sure you want to update this reply?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B8336A',
      cancelButtonColor: '#333',
      confirmButtonText: 'Yes',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`${process.env.REACT_APP_API_URL}/api/reply/update`, {
          Reply_value: editReplyValue,
          Reply_id: replyID,
        }).then(() => {
          // Update the local state
          setReplyList(prevReplies => prevReplies.map(reply => {
            if (reply.reply_id === replyID) {
              return { ...reply, reply_content: editReplyValue };
            }
            return reply;
          }));
        });
        setEditReplyShow(false);
      }
    });
  }
  function submit(){
    submitComment();
    setcomment("");
  }
  function handleCardIndex(index){
    setEditCommentShow(false);
    setEditReplyShow(false);
    setCardIndex(index)
    if (show)
        setShow(false)
    else
        setShow(true)
  }
  function handleReplyCardIndex(index, reply){
    setEditCommentShow(false);
    setShow(false);
    setEditReplyValue(reply);
    setReplyCardIndex(index)
      if(editReplyShow)
      setEditReplyShow(false)
      else
      setEditReplyShow(true)
  }

  return(
    <div className="DiscussionBoard">
      <div className="DiscussionBox">
        <h1 className="siteTitle">Discussion Board</h1>
        <div className="commentform">
          {(() => {
            if (localStorage.getItem("username") && commentCount == 2){
              return (
                <>
                <div className="userform">
                  <img 
                  className='usericon' 
                  width={'50px'} 
                  height={'50px'}
                  src={localStorage.getItem("avatar_display")}
                  />
                  <div className="userinput">
                    <h2>{localStorage.getItem("username")}</h2>
                    <p>Adding comments is restricted to 2 at a time</p>
                  </div>
                </div>
              </>
              )
            }
            else if (localStorage.getItem("username")) {
              return(
                <div className="userform">
                  <img 
                  className='usericon' 
                  width={'50px'} 
                  height={'50px'}
                  src={localStorage.getItem("avatar_display")}
                  />
                  <div className="userinput">
                    <h2>{localStorage.getItem("username")}</h2>
                    <textarea type="text" name="comment" value={comment} placeholder="Type a comment" onChange={(e)=>{setcomment(e.target.value)}}/>
                    <button onClick={submit}>Submit</button>
                  </div>
                </div>
              )
            } 
            else {
              return (
                <>
                  <p className="siteTitle"><strong>Login to join the discussion!</strong></p>
                  <div className="buttonArea">
                    <button onClick={Register}>Register</button>
                    <button onClick={Login}>Login</button>
                  </div>
                </>
              )
            }
          })()}
        </div>
        <p><strong>Comments ({commentList.length})</strong></p>
        <div className="cardholder">
          {/*Comments*/}
          {commentList.map((val)=>{
          return (
            <div className="card">
              {(() => {
              console.log(val);
              return (
              <div className="commentHeader">
                <img className='usericon' 
                width={'50px'} 
                height={'50px'}
                src={val.user_infos.useravatar_url}
                />
                <div className="commentBody">
                  <div className="userCommentDetails">
                    <h2 className='user' value={userid}>
                      {val.user_infos.username_reg}
                    </h2>
                    <BiSolidCircle className="userDateSeparator"/> 
                    <span>
                      {convertDate(new Date(val.date_written))}
                    </span>
                  </div>
                    {
                    editCommentShow && tempCommentID == val.comment_id ? 
                    <div className="comment_shown">
                    <textarea 
                    type='text' 
                    id='editText'
                    className='updateinput'
                    value={newComment}
                    onChange={(e)=>{setnewComment(e.target.value)}}
                    placeholder={val.comment_text}
                    />
                    </div>
                    :
                    <p className="commentmsg">
                    {val.comment_text}
                    </p>
                    }
                </div>
              </div>
              )})()}
              {/*Comments Action Area*/}
              {(() => {
              {console.log(val.user_infos.useremail_reg)}
              if (val.user_infos.useremail_reg == localStorage.getItem("email")) {
                console.log("else if is",val.user_infos.useremail_reg == localStorage.getItem("email"));
                return (
                  <>
                    <div className="actionArea">
                      {editCommentShow && tempCommentID == val.comment_id ?
                      <>
                        <button id='submitEditBtn' className='commentbtn' onClick={()=>{updateComment(val.comment_id)}}>Confirm</button>
                        <button id='cancelEditBtn' className='commentbtn' onClick={()=>{setEditCommentShow(false)}}>Cancel</button>
                      </>
                      :
                      <>
                        <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
                        <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
                        <button className='commentbtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
                      </>}
                    </div>
                    <div 
                    className={val.comment_id == cardIndex && show ? 
                    'reply_shown' : 
                    'reply_hidden'}
                    >
                      <textarea 
                        value={replyValue} 
                        placeholder="Input Reply" 
                        onChange={(e) => {setReplyValue(e.target.value)}} 
                        type="text"
                      />
                      <button 
                      onClick={() => submitReply(replyValue, val.comment_id)} 
                      className='commentbtn'
                      >
                        Submit Reply
                      </button>
                    </div>
                  </>
                )
              } 
              else if (localStorage.getItem("username")){
                console.log(localStorage.getItem("username"));
                return(
                  <div className="actionArea">
                    <button className='commentbtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
                  <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
                  <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
                  </div>
                  </div>
                )
              }
              })()}
              {/* Replies */}
              {replies.map((item) => {
                if(item.comment_id == val.comment_id){
                  return (
                    <div className="replyholder">
                    {convertDate(item.reply_written) == "Invalid Date" ? 
                    ""
                    :  
                    <>
                    <div className="comment">
                      <div className="commentHeader">
                        <img 
                        src={item.user_infos.useravatar_url} 
                        width="30px" 
                        height="30px"
                        />
                        <div className="commentBody">
                          <div className="userReplyDetails">
                            <label className="replyuser">
                              {item.user_infos.username_reg}
                            </label>
                            <BiSolidCircle className="userDateSeparator"/> 
                            <span>
                              {convertDate(new Date(item.reply_written))}
                            </span>
                          </div>
                          {item.reply_id == replyCardIndex && editReplyShow ?
                          <div className="reply_shown">
                            <textarea
                            value={editReplyValue}
                            placeholder={item.reply_content}
                            onChange={(e) => {setEditReplyValue(e.target.value)}}
                            type="text"
                            />
                          </div>
                          :
                          <span className="replymsg">
                          {item.reply_content}
                          </span>}
                        </div>
                      </div>
                    </div>
                    </>}
                    {item.useremail_reg == localStorage.getItem("email") ?
                    <div className="actionArea">
                      {editReplyShow && item.reply_id == replyCardIndex ?
                      <>
                      <button className='replybtn' onClick={() => editReply(item.reply_id)}>Confirm</button>
                      <button className='replybtn' onClick={()=>{setEditReplyShow(false)}}>Cancel</button>
                      </>
                      :
                      <>
                      <button className='replybtn' onClick={() => handleReplyCardIndex(item.reply_id, item.reply_content)}>Edit</button>
                      <button className='replybtn' onClick={()=>{deleteReply(item.reply_id)}}>Delete</button>
                      </>
                      }
                    </div>
                      :
                      ""
                    }
                  </div>
                  )
                }
              })}
            </div>  
          )})}
          </div>
        </div>
    </div>
  )
}