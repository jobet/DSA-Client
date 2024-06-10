import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { BiUser, BiCommentDetail, BiEdit  } from "react-icons/bi";
import { LineGraph, PieGraph, BarGraph } from "./DashboardGraphs";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Dashboard(){
    //get regular stats
    const [userStats,setuserStats]=useState([]);
    const [commentStats,setcommentStats]=useState([]);
    const [questionStats,setquestionStats]=useState([]);
    const [userCommentStats,setuserCommentStats]=useState([]);
    const [userReplyStats,setuserReplyStats]=useState([]);
    const [userTotalActivity,setuserTotalActivity]=useState([]);
    const [userQuizTakenStats,setuserQuizTakenStats]=useState([]);
    const [userQuizStats,setuserQuizStats]=useState([]);

    //get pie graph stats
    const [genderPieStats,setgenderPieStats]=useState([]);
    const [yearlevelPieStats,setyearlevelPieStats]=useState([]);
    const [programPieStats,setprogramPieStats]=useState([]);

    //get line graph stats
    const [commentLineStats,setcommentLineStats]=useState([]);
    const [quizLineStats,setquizLineStats]=useState([]);
    const [usercreateLineStats,setusercreateLineStats]=useState([]);

    //get bar graph stats
    const [quizBarStats,setquizBarStats]=useState([]);

    //get data from api
    useEffect(() => {
      //regular stats
      Axios.get('http://localhost:3001/api/admin/user_stats').then((response)=>{setuserStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_replies_stats').then((response)=>{setcommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/comments_line_stats').then((response)=>{setcommentLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/quiz_questions_stats').then((response)=>{setquestionStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_comments').then((response)=>{setuserCommentStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_replies').then((response)=>{setuserReplyStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_activity').then((response)=>{setuserTotalActivity(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_quiztaken').then((response)=>{setuserQuizTakenStats(response.data)});
      //pie graph stats
      Axios.get('http://localhost:3001/api/admin/user_demographic_gender').then((response)=>{setgenderPieStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_demographic_yearlevel').then((response)=>{setyearlevelPieStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_demographic_program').then((response)=>{setprogramPieStats(response.data)});
      //line graph stats
      Axios.get('http://localhost:3001/api/admin/quiz_taker_stats').then((response)=>{setquizLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/new_user_stats').then((response)=>{setusercreateLineStats(response.data)});
      Axios.get('http://localhost:3001/api/admin/user_stats_quizzes').then((response)=>{setuserQuizStats(response.data)});
      //bar graph stats
      Axios.get('http://localhost:3001/api/admin/quiz_bar_stats').then((response)=>{setquizBarStats(response.data)});
    } , [])
    if(localStorage.getItem("adminusername")){
     return(
       <>
        <div className="BackendPage">
            <h2 className="backend_title">Dashboard</h2><br/>
            <table className="dashboardtable">
              <tr>
                <td>
                  <div className="dashboardcard">
                  {userStats.map((val)=>{return (
                  <div>
                    <span class="dashboardtitle">Users</span>
                    <table className="seperation">
                      <tr>
                        <td>
                        <h2 class="dashboardstats">{val.Verified_Users} Verified Users</h2>
                        <h2 class="dashboardstats">{val.Total_Users} Total Users</h2>
                        </td>
                        <td>
                        <h2 class="dashboardicon"><BiUser /></h2>
                        </td>
                      </tr>
                    </table>
                    
                    <Link to='/manage-users'>
                    <button className="backendbtn">Manage Users</button>
                    </Link>
                  </div>
                  )})}
                  </div>
                </td>
                <td>
                  <div className="dashboardcard">
                  {commentStats.map((val)=>{return (
                  <div>
                    <span class="dashboardtitle">Discussion</span>
                    <table className="seperation">
                      <tr>
                        <td><h2 class="dashboardstats">{val.Comments} Comments</h2>
                        <h2 class="dashboardstats">{val.Replies} Replies</h2></td>
                        <td>
                        <h2 class="dashboardicon"><BiCommentDetail/></h2>  
                        </td>
                      </tr>
                      </table>
                    <Link to='/manage-discussion'>
                    <button className="backendbtn">Manage Discussion</button>
                    </Link>
                  </div>
                  )})}
                  </div>
                </td>
                <td>
                  <div className="dashboardcard">
                  {questionStats.map((val)=>{return (
                  <div>
                    <span class="dashboardtitle">Quiz</span>
                    <table className="seperation">
                      <tr>
                        <td>
                          <h2 class="dashboardstats">{val.Questions} Questions</h2>
                        <h2 class="dashboardstats">{val.QuizTakers} Quizzes Taken</h2>
                        </td>
                        <td><h2 class="dashboardicon"><BiEdit/></h2>
                        </td>
                      </tr>
                    </table>
                    <Link to='/manage-quiz'>
                    <button className="backendbtn">Manage Quiz</button>
                    </Link>
                  </div>
                    )})}
                  </div>
                </td>
              </tr>
            </table>
            <Tabs className="backendtabs" selectedTabClassName="backendtab--selected">
              <TabList className="backendtablist">
                <Tab className="backendtab"><span class="dashboardtitle">Demographic</span></Tab>
                <Tab className="backendtab"><span class="dashboardtitle">Activity Analytics</span></Tab>
                <Tab className="backendtab"><span class="dashboardtitle">Quiz Analytics</span></Tab>
              </TabList>
            <TabPanel>
            <table className="dashboardtable">
           
              <tr>
                <td>       
            <div className="dashboardcard">
            <span class="dashboardtitle">Users by Gender</span>
            <table class="seperation">
              {genderPieStats.map((val)=>{return (
                      <tr>
                        <td><h2 class="dashboardstats">{val.Gender}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Amount}</p></b></td>
                      </tr>
                    )})}
            </table>
                  </div>
                  <div className="dashboardcard">
            <span class="dashboardtitle">Users by Year Level</span>
            <table class="seperation">
              {yearlevelPieStats.map((val)=>{return (
                      <tr>
                        <td><h2 class="dashboardstats">{val.YearLevel}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Amount}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div>   
            <div className="dashboardcard">
            <span class="dashboardtitle">Users by CCIS Program</span>
            <table class="seperation">
              {programPieStats.map((val)=>{return (
                      <tr>
                        <td><h2 class="dashboardstats">{val.Program}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Amount}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div>  
                </td>
                <td>
                <div className="dashboardcard">
              <span class="dashboardtitle">User Demographic</span>
              <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                <TabList className="graphtablist">
                  <Tab className="graphtab"><strong>Gender</strong></Tab>
                  <Tab className="graphtab"><strong>Year Level</strong></Tab>
                  <Tab className="graphtab"><strong>Academic Program (CCIS)</strong></Tab>
              </TabList>
              <TabPanel>
                <PieGraph labels={genderPieStats.map(val => val.Gender)} datas={genderPieStats.map(val => val.Amount)} label={'Gender'} 
                color={['#ff4573','#457dff','#aeff45']} />
              </TabPanel>     
              <TabPanel>
              <PieGraph labels={yearlevelPieStats.map(val => val.YearLevel)} datas={yearlevelPieStats.map(val => val.Amount)} label={'Gender'} 
                color={['#ff9645','#fff645','#96ff45','#45ffa5','#45b8ff']} />
              </TabPanel>
              <TabPanel>
              <PieGraph labels={programPieStats.map(val => val.Program)} datas={programPieStats.map(val => val.Amount)} label={'Gender'} 
                color={['#5845ff','#ca45ff','#ff45ae','#ff4545']} />
              </TabPanel>
              </Tabs>      
                </div>
                </td>
              </tr>
            </table>  
            </TabPanel>
            <TabPanel>
            <table className="dashboardtable">
           
              <tr>
                <td>       
            <div className="dashboardcard">
            <span class="dashboardtitle">Most User Comments</span>
            <table class="seperationusers">
              {userCommentStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Comments}</p></b></td>
                      </tr>
                    )})}
            </table>
                  </div>
                  <div className="dashboardcard">
            <span class="dashboardtitle">Most User Replies</span>
            <table class="seperationusers">
              {userReplyStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Replies}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div>   
            <div className="dashboardcard">
            <span class="dashboardtitle">Most User Activity</span>
            <table class="seperationusers">
              {userTotalActivity.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.TotalActivity}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div>
                </td>
                <td>
                <div className="dashboardcard">
              <span class="dashboardtitle">User Activity</span>
              <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                <TabList className="graphtablist">
                  <Tab className="graphtab"><strong>New Users</strong></Tab>
                  <Tab className="graphtab"><strong>Comments & Replies</strong></Tab>
              </TabList>
              <TabPanel>
                <LineGraph labels={usercreateLineStats.map(val => val.DateMade)} data1={usercreateLineStats.map(val => val.NewUsers)} label1={'New Users'} 
                label2={''} color1={'rgb(209, 23, 230, 0.60)'} color2={'rgb(0,0,0,0)'}/>
              </TabPanel>     
              <TabPanel>
                <LineGraph labels={commentLineStats.map(val => val.date_writtens)} data1={commentLineStats.map(val => val.Comments)} label1={'Comments'} 
                data2={commentLineStats.map(val => val.Replies)} label2={'Replies'} color1={'rgb(3, 94, 252, 0.60)'} color2={'rgb(252, 3, 94, 0.60)'}/>
              </TabPanel>
              </Tabs>      
                </div>
                </td>
              </tr>
            </table>
            </TabPanel>
            <TabPanel>
            <table className="dashboardtable">
              <tr>
                <td>
            <div className="dashboardcard">
            <span class="dashboardtitle">Most User Quiz Taken</span>
            <table class="seperationusers">
              {userQuizTakenStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.QuizTaken}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div> 
            <div className="dashboardcard">
            <span class="dashboardtitle">Top Scorers on Quizzes</span>
            <table class="seperationusers">
              {userQuizStats.map((val)=>{return (
                      <tr>
                        <td><img src={val.Avatar} width={20}/></td>
                        <td><h2 class="dashboardstats">{val.Username}</h2></td>
                        <td><b><p style={{textAlign: "right"}}>{val.Score}/{val.Total}</p></b></td>
                      </tr>
                    )})}
            </table>
            </div> 
                </td>
                <td>
                <div className="dashboardcard">
              <span class="dashboardtitle">User Activity</span>
              <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                <TabList className="graphtablist">
                  <Tab className="graphtab"><strong>Quizzes Taken</strong></Tab>
                  <Tab className="graphtab"><strong>Quiz Statistics</strong></Tab>
              </TabList>
              <TabPanel>
              <LineGraph labels={quizLineStats.map(val => val.DateMade)} data1={quizLineStats.map(val => val.QuizTakers)} label1={'Quizzes Taken'}
                label2={''} color1={'rgb(38, 230, 0, 0.6)'} color2={'rgb(0,0,0,0)'}/>
              </TabPanel>
              <TabPanel>
              <BarGraph labels={quizBarStats.map(val => val.DateMade)} data1={quizBarStats.map(val => val.LowPercentage)} label1={'Lowest Percentage Score'}
                data2={quizBarStats.map(val => val.AVGPercentage)} label2={'Average Percentage Score'} data3={quizBarStats.map(val => val.HighPercentage)} label3={'Highest Percentage Score'} color1={'rgb(235, 100, 52)'} color2={'rgb(235, 235, 52)'} color3={'rgb(113, 235, 52)'}/>
              </TabPanel>
              </Tabs>      
                </div>
                </td>
              </tr>
            </table>
            </TabPanel>
            </Tabs>
        </div>  
        </>
        )
    }
    else window.location.href = "/admin";
}