import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default function ScorePage(){

    const [scoreList, setScoreList] = useState([]);
    const [topScore,setTopScore] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
     //get scorelist
     useEffect(() => {
        Axios.post(`${process.env.REACT_APP_API_URL}/api/scoreList/post`,{useremail_reg:localStorage.getItem('email')}).then((response)=>{
          setScoreList(response.data);

  
      });
        Axios.get(`${process.env.REACT_APP_API_URL}/api/profileScore/get`).then((response)=>{
            setTopScore(response.data);
      });
    } , []) 
    

    //function for calculating percentages of the scores
    function calculatePercent (score, total){
        return ((parseInt(score) / parseInt(total)) * 100).toFixed(2);
    }

    //function for calculating the color value of the trails in the progress bars
    function calculateColor (percent){
        if (percent >= 0 && percent <= 25)
            return "#C0392B"
        else if (percent >= 26 && percent <= 50)
            return "#F39C12"
        else if (percent >= 51 && percent <= 75)
            return "#F1C40F"
        else if (percent >= 76 && percent <= 100)
            return "#5cb85c"
    }

    //function for formating datetime string
    function formatDateTime(dateTimeString){
        let finalDate = "";
        var seconds = Math.floor((new Date() - dateTimeString) / 1000);
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
    
    return(
        <div className="ScorePage">
            <div className="ScoreContainer">
            <h1 style={{textAlign: 'center'}}>
                    {selectedTab === 0 ? 'Your Quiz Scores' : 'Top Quiz Scores'}
            </h1>
            <div className="ScoreBox">
                <Tabs 
                    className="scoretabs" 
                    selectedTabClassName="scoretab--selected"
                    onSelect={index => setSelectedTab(index)}
                >
                    <TabList className="scoretablist">
                        <Tab className="scoretab1"><strong>Your Scores</strong></Tab>
                        <Tab className="scoretab2"><strong>Top Scores</strong></Tab>
                    </TabList>
                    <TabPanel className="yourScoreTab">
                        {
                            scoreList.map((item)=>{
                                return (
                                <div className="scoreCard">
                                    <div className="scoreInfo">
                                        <h2>{item.user_score}/{item.questions_total}</h2>
                                        <p>Taken {formatDateTime(new Date(item.quiz_taken))}</p>
                                    </div>
                                    <div className="scorePercent">
                                        <CircularProgressbar
                                            value={parseInt(item.user_score)}
                                            maxValue={parseInt(item.questions_total)}
                                            text={`${Math.trunc(calculatePercent(item.user_score,item.questions_total)).toFixed()}%`}
                                            circleRatio={1}
                                            styles={{
                                                trail:{
                                                    strokeLinecap: "round",
                                                },
                                                path:{
                                                    strokeLinecap: "round",
                                                    stroke: calculateColor(calculatePercent(item.user_score,item.questions_total)), 
                                                },
                                                text:{
                                                    fill: calculateColor(calculatePercent(item.user_score,item.questions_total)),
                                                    fontSize:"1rem",
                                                    
                                                },
                                            }}
                                            strokeWidth = {10}
                                        >
                                        </CircularProgressbar>
                                    </div>
                                </div>
                            )})
                        }
                    </TabPanel>     
                    <TabPanel className="topScoreTab">
                            {topScore.map((item)=>{
                                return(
                                    <div className="scoreCard">
                                        <div className="topScoreInfo">
                                            <div className="userAvatarInfo">
                                                <img
                                                src={item.user_infos.useravatar_url}
                                                />
                                            </div>
                                            <div className="userScoreInfo">
                                                <h2>
                                                    {item.user_infos.username_reg}
                                                </h2>
                                                <h2>{item.user_score}/{item.questions_total}</h2>
                                                <p>{formatDateTime(new Date(item.quiz_taken))}</p>
                                            </div>
                                        </div>
                                    <div className="scorePercent">
                                        <CircularProgressbar
                                            value={parseInt(item.user_score)}
                                            maxValue={parseInt(item.questions_total)}
                                            text={`${Math.trunc(calculatePercent(item.user_score,item.questions_total)).toFixed()}%`}
                                            circleRatio={1}
                                            styles={{
                                                trail:{
                                                    strokeLinecap: "round",
                                                },
                                                path:{
                                                    strokeLinecap: "round",
                                                    stroke: calculateColor(calculatePercent(item.user_score,item.questions_total)), 
                                                },
                                                text:{
                                                    fill: calculateColor(calculatePercent(item.user_score,item.questions_total)),
                                                    fontSize:"1rem",
                                                    
                                                },
                                            }}
                                            strokeWidth = {10}
                                        >
                                        </CircularProgressbar>
                                    </div>
                                    </div>
                                )
                            })
                            }
                    </TabPanel>
                </Tabs>
            </div>
            </div>
        </div>
    )
}