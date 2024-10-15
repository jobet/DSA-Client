import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { BiSolidCircle } from "react-icons/bi";

export default function ManageDiscussion(){
    const [commentList,setcommentList]=useState([]);
    const [replies, setReplyList] = useState([]);
    const [backupCommentList, setBackupCommentList] =useState([])

    
    //get comment and replies
    useEffect(() => {
      Axios.post(`${process.env.REACT_APP_API_URL}/api/reply_get`).then((response)=>{
        setReplyList(response.data);

    });
        Axios.get(`${process.env.REACT_APP_API_URL}/api/comment/get`).then((response)=>{
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

    const deleteComment=(id)=>{
      Swal.fire({
        title: 'Are you sure you want to delete this user comment?',
        text: "",
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

    function deleteReply(id){
      Swal.fire({
        title: 'Are you sure you want to delete this user reply?',
        text: "",
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
    const [show, setShow] = useState(false);
      if(localStorage.getItem("adminusername")){
     return(
       <div className="DashboardPage">
        <div className="BackendPage">
          <div className="DiscussionBox">
            <h1 className="siteTitle">Discussion Management</h1>
            <p><strong>Comments ({commentList.length})</strong></p>
            <div className="cardholder">
              {commentList.map((val) => (
                <div className="card" key={val.comment_id}>
                  <div className="commentHeader">
                    <img
                      className='usericon'
                      width='50px'
                      height='50px'
                      src={val.user_infos.useravatar_url}
                      alt="User Avatar"
                    />
                    <div className="commentBody">
                      <div className="userCommentDetails">
                        <h2 className='user'>{val.user_infos.username_reg}</h2>
                        <BiSolidCircle className="userDateSeparator"/> 
                        <span>{convertDate(new Date(val.date_written))}</span>
                      </div>
                      <p className="commentmsg">{val.comment_text}</p>
                    </div>
                  </div>
                  <div className="actionArea">
                    <button id='deleteBtn' className='commentbtn' onClick={() => deleteComment(val.comment_id)}>Delete</button>
                  </div>
                  {/* Replies */}
                  {replies.map((item) => {
                    if (item.comment_id === val.comment_id) {
                      return (
                        <div className="replyholder" key={item.reply_id}>
                          {convertDate(new Date(item.reply_written)) !== "Invalid Date" && (
                            <>
                              <div className="comment">
                                <div className="commentHeader">
                                  <img 
                                    src={item.user_infos.useravatar_url} 
                                    width="30px" 
                                    height="30px"
                                    alt="User Avatar"
                                  />
                                  <div className="commentBody">
                                    <div className="userReplyDetails">
                                      <label className="replyuser">{item.user_infos.username_reg}</label>
                                      <BiSolidCircle className="userDateSeparator"/> 
                                      <span>{convertDate(new Date(item.reply_written))}</span>
                                    </div>
                                    <span className="replymsg">{item.reply_content}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="actionArea">
                                <button className='replybtn' onClick={() => deleteReply(item.reply_id)}>Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     )
    }
    else window.location.href = "/admin"; 
}