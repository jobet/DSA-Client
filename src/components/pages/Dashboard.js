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
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_stats`).then((response)=>{setuserStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/comments_replies_stats`).then((response)=>{setcommentStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/comments_line_stats`).then((response)=>{setcommentLineStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/quiz_questions_stats`).then((response)=>{setquestionStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_stats_comments`).then((response)=>{setuserCommentStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_stats_replies`).then((response)=>{setuserReplyStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_stats_activity`).then((response)=>{setuserTotalActivity(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_stats_quiztaken`).then((response)=>{setuserQuizTakenStats(response.data)});
      //pie graph stats
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_demographic_gender`).then((response)=>{setgenderPieStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_demographic_yearlevel`).then((response)=>{setyearlevelPieStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_demographic_program`).then((response)=>{setprogramPieStats(response.data)});
      //line graph stats
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/quiz_taker_stats`).then((response)=>{setquizLineStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/new_user_stats`).then((response)=>{setusercreateLineStats(response.data)});
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/user_stats_quizzes`).then((response)=>{setuserQuizStats(response.data)});
      //bar graph stats
      Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/quiz_bar_stats`).then((response)=>{setquizBarStats(response.data)});
    } , [])
    if(localStorage.getItem("adminusername")){
     return(
       <div className="DashboardPage">
        <div className="BackendPage">
            <h1 className="siteTitle">Dashboard</h1>
            <div className="dashboardMain">
                <div className="dashboardcard">
                {userStats.map((val)=>{return (
                <div className="seperation">
                    <div>
                      <h1 class="dashboardtitle">Users</h1>
                      <h3>{val.verified_users} Verified Users</h3>
                      <h3>{val.total_users} Total Users</h3>
                      <Link to='/manage-users' className="backendLinkBtn">
                        <button>Manage Users</button>
                      </Link>
                    </div>
                    <div>
                      <BiUser className="dashboardicon"/>
                    </div>
                </div>
                )})}
                </div>
                <div className="dashboardcard">
                {commentStats.map((val)=>{return (
                <div className="seperation">
                  <div>
                    <h1 class="dashboardtitle">Discussion</h1>
                    <h3>{val.comments} Comments</h3>
                    <h3>{val.replies} Replies</h3>
                    <Link to='/manage-discussion' className="backendLinkBtn">
                      <button>Manage Discussion</button>
                    </Link>
                  </div>
                  <div>
                    <BiCommentDetail className="dashboardicon"/>
                  </div>
                </div>
                )})}
                </div>
                <div className="dashboardcard">
                {questionStats.map((val)=>{return (
                <div className="seperation">
                  <div>
                    <h1 class="dashboardtitle">Quiz</h1>
                    <h3>{val.questions} Questions</h3>
                    <h3>{val.quiztakers} Quizzes Taken</h3>
                    <Link to='/manage-quiz' className="backendLinkBtn">
                      <button>Manage Quiz</button>
                    </Link>
                  </div>
                  <div>
                    <BiEdit className="dashboardicon"/>
                  </div>
                </div>
                  )})}
                </div>
            </div>
            <Tabs className="backendtabs" selectedTabClassName="backendtab--selected">
              <TabList className="backendtablist">
                <Tab className="backendtab">
                  <span class="dashboardtitle">
                    <BiUser/>Demographic
                  </span>
                </Tab>
                <Tab className="backendtab">
                  <span class="dashboardtitle">
                    <BiCommentDetail/> Activity
                  </span>
                </Tab>
                <Tab className="backendtab">
                  <span class="dashboardtitle">
                    <BiEdit/> Quiz
                  </span>
                </Tab>
              </TabList>
            <TabPanel>
            <div className="dashboardtable">
              <div className="leftPanel">       
                <div className="dashboardcard">
                  <div className="dashboardDetails">
                    <h1>Users by Gender</h1>
                    {genderPieStats.map((val)=>{return (
                        <div class="seperation">
                          <h2 class="dashboardstats">{val.gender}</h2>
                          <p style={{textAlign: "right"}}><strong>{val.amount}</strong></p>
                        </div>
                    )})}
                  </div>
                </div>
            <div className="dashboardcard">
              <div className="dashboardDetails">
                  <h1>Users by Year Level</h1>
                  {yearlevelPieStats.map((val) => (
                      <div className="seperation" key={val.yearlevel}>
                          <h2 className="dashboardstats">{val.yearlevel}</h2>
                          <p style={{textAlign: "right"}}><strong>{val.amount}</strong></p>
                      </div>
                  ))}
              </div>
            </div>     
            <div className="dashboardcard">
              <div className="dashboardDetails">
                  <h1>Users by CCIS Program</h1>
                  {programPieStats.map((val) => (
                      <div className="seperation" key={val.program}>
                          <h2 className="dashboardstats">{val.program}</h2>
                          <p style={{textAlign: "right"}}><strong>{val.amount}</strong></p>
                      </div>
                  ))}
              </div>
            </div> 
              </div>
              <div className="rightPanel">
                <div className="dashboardcard">
                  <h1 class="dashboardtitle">User Demographic</h1>
                  <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                    <TabList className="graphtablist">
                      <Tab className="graphtab"><strong>Gender</strong></Tab>
                      <Tab className="graphtab"><strong>Year Level</strong></Tab>
                      <Tab className="graphtab"><strong>Academic Program (CCIS)</strong></Tab>
                  </TabList>
                  <TabPanel>
                    <PieGraph 
                    labels={genderPieStats.map(val => val.gender)} 
                    datas={genderPieStats.map(val => val.amount)} 
                    label={'Gender'} 
                    color={['#ff4573','#457dff','#aeff45']} />
                  </TabPanel>     
                  <TabPanel>
                    <PieGraph 
                    labels={yearlevelPieStats.map(val => val.yearlevel)} 
                    datas={yearlevelPieStats.map(val => val.amount)} 
                    label={'Year Level'} 
                    color={['#ff9645','#fff645','#96ff45','#45ffa5','#45b8ff']} />
                  </TabPanel>
                  <TabPanel>
                    <PieGraph 
                    labels={programPieStats.map(val => val.program)} 
                    datas={programPieStats.map(val => val.amount)} 
                    label={'Program'} 
                    color={['#5845ff','#ca45ff','#ff45ae','#ff4545']} />
                  </TabPanel>
                  </Tabs>      
                </div>
              </div>
            </div>  
            </TabPanel>
            <TabPanel>
              <div className="dashboardtable">
                  <div className="leftPanel">       
                      <div className="dashboardcard">
                          <div className="dashboardDetails">
                              <h1>Most User Comments</h1>
                              {userCommentStats.map((val) => (
                                  <div className="seperation" key={val.username}>
                                      <h2 className="dashboardstats">
                                          <img src={val.avatar} width={20} alt={val.username} /> {val.username}
                                      </h2>
                                      <p style={{textAlign: "right"}}><strong>{val.comments}</strong></p>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="dashboardcard">
                          <div className="dashboardDetails">
                              <h1>Most User Replies</h1>
                              {userReplyStats.map((val) => (
                                  <div className="seperation" key={val.username}>
                                      <h2 className="dashboardstats">
                                          <img src={val.avatar} width={20} alt={val.username} /> {val.username}
                                      </h2>
                                      <p style={{textAlign: "right"}}><strong>{val.replies}</strong></p>
                                  </div>
                              ))}
                          </div>
                      </div>   
                      <div className="dashboardcard">
                          <div className="dashboardDetails">
                              <h1>Most User Activity</h1>
                              {userTotalActivity.map((val) => (
                                  <div className="seperation" key={val.username}>
                                      <h2 className="dashboardstats">
                                          <img src={val.avatar} width={20} alt={val.username} /> {val.username}
                                      </h2>
                                      <p style={{textAlign: "right"}}><strong>{val.totalactivity}</strong></p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
                  <div className="rightPanel">
                      <div className="dashboardcard">
                          <h1 className="dashboardtitle">User Activity</h1>
                          <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                              <TabList className="graphtablist">
                                  <Tab className="graphtab"><strong>New Users</strong></Tab>
                                  <Tab className="graphtab"><strong>Comments & Replies</strong></Tab>
                              </TabList>
                              <TabPanel>
                                <LineGraph 
                                  labels={usercreateLineStats.map(val => val.datemade)} 
                                  data1={usercreateLineStats.map(val => val.newusers)} 
                                  label1={'New Users'} 
                                  data2={[]} 
                                  label2={''} 
                                  color1={'rgb(209, 23, 230, 0.60)'} 
                                  color2={'rgb(0,0,0,0)'}
                                />
                              </TabPanel>     
                              <TabPanel>
                                <LineGraph 
                                  labels={commentLineStats.map(val => val.date_writtens)} 
                                  data1={commentLineStats.map(val => val.comments)} 
                                  label1={'Comments'} 
                                  data2={commentLineStats.map(val => val.replies)} 
                                  label2={'Replies'} 
                                  color1={'rgb(3, 94, 252, 0.60)'} 
                                  color2={'rgb(252, 3, 94, 0.60)'}
                                />
                              </TabPanel>
                          </Tabs>      
                      </div>
                  </div>
              </div>
          </TabPanel>
          <TabPanel>
              <div className="dashboardtable">
                  <div className="leftPanel">
                      <div className="dashboardcard">
                          <div className="dashboardDetails">
                              <h1>Most User Quiz Taken</h1>
                              {userQuizTakenStats.map((val) => (
                                  <div className="seperation" key={val.username}>
                                      <h2 className="dashboardstats">
                                          <img src={val.avatar} width={20} alt={val.username} /> {val.username}
                                      </h2>
                                      <p style={{textAlign: "right"}}><strong>{val.quiztaken}</strong></p>
                                  </div>
                              ))}
                          </div>
                      </div> 
                      <div className="dashboardcard">
                          <div className="dashboardDetails">
                              <h1>Top Scorers on Quizzes</h1>
                              {userQuizStats.map((val) => (
                                  <div className="seperation" key={val.username}>
                                      <h2 className="dashboardstats">
                                          <img src={val.avatar} width={20} alt={val.username} /> {val.username}
                                      </h2>
                                      <p style={{textAlign: "right"}}><strong>{val.score}/{val.total}</strong></p>
                                  </div>
                              ))}
                          </div>
                      </div> 
                  </div>
                  <div className="rightPanel">
                      <div className="dashboardcard">
                          <h1 className="dashboardtitle">User Activity</h1>
                          <Tabs className="graphtabs" selectedTabClassName="graphtab--selected">
                              <TabList className="graphtablist">
                                  <Tab className="graphtab"><strong>Quizzes Taken</strong></Tab>
                                  <Tab className="graphtab"><strong>Quiz Statistics</strong></Tab>
                              </TabList>
                              <TabPanel>
                                <LineGraph 
                                  labels={quizLineStats.map(val => val.DateMade)} 
                                  data1={quizLineStats.map(val => val.QuizTakers)} 
                                  label1={'Quizzes Taken'}
                                  data2={[]}
                                  label2={''}
                                  color1={'rgb(38, 230, 0, 0.6)'} 
                                  color2={'rgb(0,0,0,0)'}
                                />
                              </TabPanel>
                              <TabPanel>
                                <BarGraph 
                                  labels={quizBarStats.map(val => val.datemade)} 
                                  data1={quizBarStats.map(val => val.lowpercentage)} 
                                  label1={'Lowest Percentage Score'}
                                  data2={quizBarStats.map(val => val.avgpercentage)} 
                                  label2={'Average Percentage Score'} 
                                  data3={quizBarStats.map(val => val.highpercentage)} 
                                  label3={'Highest Percentage Score'} 
                                  color1={'rgb(235, 100, 52)'} 
                                  color2={'rgb(235, 235, 52)'} 
                                  color3={'rgb(113, 235, 52)'}
                                />
                              </TabPanel>
                          </Tabs>      
                      </div>
                  </div>
              </div>
          </TabPanel>
            </Tabs>
        </div>  
        </div>
        )
    }
    else window.location.href = "/admin";
}