import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormatMonth from '../functions/formatMonth';
import FormatTime from '../functions/formatTime';
import {AvatarGenerator} from './generator_avatar.ts';
import crown from '../images/crown.png';
import ReactSession from 'react-client-session/dist/ReactSession';
import man from '../images/sit.png';
import checklist from '../images/pencil.png';

export default function ScorePage(){

    const [scoreList, setScoreList] = useState([]);
    const [topScore,setTopScore] = useState([]);
    const generator = new AvatarGenerator();

     //get scorelist
     useEffect(() => {
        Axios.post(`${process.env.REACT_APP_API_URL}/api/scoreList/post`,{useremail_reg:ReactSession.get('email')}).then((response)=>{
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
        let year = dateTimeString.slice(0,4);
        let month = dateTimeString.slice(5,7)
        let day = dateTimeString.slice(8,10)
        let hour = (parseInt(dateTimeString.slice(11,13)) - 8)
        let minute = dateTimeString.slice(14,16)

        let formatedMonth = FormatMonth(month)
        let formatedTime = FormatTime(hour,minute)
        
        return formatedMonth + " " + (parseInt(day)+1) + ", " + year + " - " + formatedTime
    }
    
    return(
        <div className="InformationBox1">
             
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
                            <h1 >{item.username_reg}</h1>
                            Score for daily quiz:
                            <br/>
                            {item.user_score} / {item.questions_total}
                            <br/>
                            <br/>
                            Taken on:
                            <br/>
                            {formatDateTime(item.quiz_taken)}
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
                            <img width={'90px'} height={'90px'} src={item.useravatar_url}></img>
                            </div>
                            <div className="scoreRow">

                                <h3>{item.username_reg}</h3>{formatDateTime(item.quiz_taken)} <h1>{item.user_score} / {item.questions_total}</h1>
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