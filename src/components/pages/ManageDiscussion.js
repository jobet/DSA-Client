import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function ManageDiscussion(){
    const [commentList,setcommentList]=useState([]);
    const [replies, setReplyList] = useState([]);
    const [backupCommentList, setBackupCommentList] =useState([])

    
    //get comment and replies
    useEffect(() => {
      Axios.post('http://localhost:3001/api/reply_get').then((response)=>{
        setReplyList(response.data);

    });
        Axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data);
    });
    } , [])
    useEffect(() => {
  } , [commentList])

    useEffect(() => {
     if (commentList.length){
        setBackupCommentList([...commentList])
     }
  } , [commentList])
    function convertDate(date){
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }

    const deleteComment=(id)=>{
      Swal.fire({
        title: 'Are you sure you want to delete this user comment?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {
          Axios.delete(`http://localhost:3001/api/comment/delete/${id}`)
            const updatedBackendComments = commentList.filter(val => val.comment_id != id);
            //setDeleteCount(deleteCount + 1);
            setcommentList([...updatedBackendComments]);
         Axios.delete(`http://localhost:3001/api/reply/delete/${id}`)

        }

      })
    }

    function deleteReply(id){
      Swal.fire({
        title: 'Are you sure you want to delete this user reply?',
        text: "",
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
         Axios.delete(`http://localhost:3001/api/user_reply/delete/${id}`)

        }

      })
    }
    const [show, setShow] = useState(false);
      if(localStorage.getItem("adminusername")){
     return(
       <>
        <div className="BackendPage">
            <h2 className="backend_title">Discussion Management</h2>
            <br></br>
            <div className="cardholder">
        {(() => { 
          if (!commentList.length){
            console.log('comment list was emptied')
            // console.log(backupCommentList)
            setcommentList([...backupCommentList])
          }
        })}
            {
            commentList.map((val)=>{
               return (
                <div className="backendcard">
                  {(() => {
          return (
            <>
            <table className="comment">
              <tr>
                <td>
                <img className='usericon' width={'45px'} height={'50px'}src={val.useravatar_url}></img>
                </td>
              <td>
              <span className='backenduser'>  {val.username_reg}</span> • {convertDate(new Date(val.date_written))}
              </td>
              </tr>
            </table>
            <p className="commentmsg">{val.comment_text} </p>
            <button id='deleteBtn' className='deletebtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            </>
          )
        })()}

{/* Replies */}
<div className="replyholder">
        {replies.map((item) => (
          <>
            {item.comment_id == val.comment_id ? <div>{convertDate(new Date(item.reply_written)) == "Invalid Date" ? "" :    
            <div>
              <table className="comment">
                <tr>
                  <td>
                  <img src={item.useravatar_url} width="20px" height="20px"></img>
                  </td>
                  <td>
                  <label className="backendreplyuser">{item.username_reg}</label><span> • {convertDate(new Date(item.reply_written))}</span>
                  </td>
                </tr>
              </table>
            <p className="replymsg">{item.reply_content}</p>
            <button className='deletebtn' onClick={()=>{deleteReply(item.reply_id)}}>Delete</button>
            </div>}        
          </div>:"" }
          </>
        ))}</div>
              </div>
               ) 
            })}
            </div>
        </div>
        </>
     )
    }
    else window.location.href = "/admin"; 
}