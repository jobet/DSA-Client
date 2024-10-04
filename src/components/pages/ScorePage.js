import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormatMonth from '../functions/formatMonth';
import FormatTime from '../functions/formatTime';
import {AvatarGenerator} from './generator_avatar.ts';
import crown from '../images/crown.png';
import man from '../images/sit.png';
import checklist from '../images/pencil.png';

export default function ScorePage(){

    const [scoreList, setScoreList] = useState([]);
    const [topScore,setTopScore] = useState([]);
    const generator = new AvatarGenerator();

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
             
             <div className="outerleft">
            <img className="checklist" src={checklist}></img>
             <h1 className="labelScore">Your Scores: </h1>
                <img className="man" src={man}></img>
            <div className="scoreLeft">
               
            <div className="cardholderScore">
            {
                scoreList.map((item)=>{
                    return (
                     <div className="score-card">
                        <div className = "score-information-holder">
                            <h1 >{item.user_infos.username_reg}</h1>
                            Score for daily quiz:
                            <br/>
                            {item.user_score} / {item.questions_total}
                            <br/>
                            <br/>
                            Taken on:
                            <br/>
                            {formatDateTime(new Date(item.quiz_taken))}
                        </div>
                        <div className="progress-circle-container">
                            <CircularProgressbar
                                value={parseInt(item.user_score)}
                                maxValue={parseInt(item.questions_total)}
                                text={`${calculatePercent(item.user_score,item.questions_total)} %`}
                                circleRatio={0.7} //Makes a semi-circle that is 70% of a full circle.
                                styles={{
                                    trail:{
                                        strokeLinecap: "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center",
                                    },
                                    path:{
                                        strokeLinecap: "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center",
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
            </div>
            </div>
            </div>
            <div className="scoreRight">
                <img className = "crown" src={crown}></img>
                <h1>Top 7 Recent Quiz Scorers </h1>
                <div className="scoreTable">
                {topScore.map((item)=>{
                    return(
                        <div>
                            <div className="scorePic">
                            <img width={'90px'} height={'90px'} src={item.user_infos.useravatar_url}></img>
                            </div>
                            <div className="scoreRow">

                                <h3>{item.user_infos.username_reg}</h3>{formatDateTime(new Date(item.quiz_taken))} <h1>{item.user_score} / {item.questions_total}</h1>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            </div>
        </div>
    )
}