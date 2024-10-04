import React, {useEffect, useState, useRef, useReducer} from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import fill_blank from '../images/fill_in_the_blank.jpg'
import fil_blank2 from '../images/fill_blank.jpg'
import t_or_f from '../images/t_or_f.jpg'
import { BiHelpCircle, BiX  } from "react-icons/bi";

export default function Quiz(){
    let history = useHistory();
    const [modal, setModal] = useState(false);

    function enterLogin(){
        history.push("/login-form");
    }
    function enterRegister(){
        history.push("/register-form");
    }
    function enterScorePage(){
        history.push("/score-page");
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [questionSets, setQuestionSets] = useState([]);
    const answers = useRef({});
    const [currentBlankAnswer, setCurrentBlankAnswer] = useState("");
    const separator = "`$`";
    const [started, setStarted] = useState(false);
    const [hasTakenQuizToday, setHasTakenQuizToday] = useState(false);
    
    var prnDt = "Today's " + new Date().toLocaleDateString('en-us', { weekday: 'long' }) + " Quiz";

    const [questionNo, setQuestionNo] = useState(0);
  
    function NextQuestion(){
        let number = questionNo+1
        setQuestionNo(number)
        setCurrentBlankAnswer(answers.current[parseInt(questionNo+1)]);
    }

    function PrevQuestion(){
        let number = questionNo-1
        setQuestionNo(number)
        setCurrentBlankAnswer(answers.current[parseInt(questionNo-1)]);
    }

    function FillAnswer(answer){
        answers.current[parseInt(questionNo)] = answer
    }

    function SelectAnswer(answer){
        answers.current[parseInt(questionNo)] = answer
        forceUpdate()
        console.log(answers.current)
    }

    function FinishQuiz(){
        let scoremsg = ""
        let msg = ""
        if(hasTakenQuizToday){
            scoremsg = "Score not recorded."
            msg = "You have already taken a quiz for today. This will not update your previous score."
        }
        else{
            scoremsg = "Quiz score recorded! "
            msg = "This is your first attempt today. The result will be your permanent score for this day"
        }
        Swal.fire({
            icon: 'error',
            title: 'Logged out'
        })

        Swal.fire({
            title: 'Submit Answers?',
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'No',
            cancelButtonText:'Yes'
        }).then((result) => {
            if (!result.isConfirmed) {
                let score = 0;

                for(let i=0;i<questionSets.length;i++){
                    if(questionSets[i].correct_answer == answers.current[i])
                        score++;
                }
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
                var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                var dateTimeSQL = date+' '+timeSQL;

                if(!hasTakenQuizToday){
                    Axios.post(`${process.env.REACT_APP_API_URL}/api/quiz_finish`, {
                        Reg_email: localStorage.getItem('email'),
                        User_score: score, 
                        Q_total: questionSets.length,
                        Q_taken: dateTimeSQL
                    });
                }

                Swal.fire(
                    'Success!',
                    scoremsg +"Result:"+score +"/" +questionSets.length,
                    'success');
                enterScorePage();

            }

        })
        // alert(score)

    
    }

    function QuizQuestion(props){
        return(
        <div class="grid-questions">
            <h1>Question {questionNo+1}</h1>
            {questionSets[questionNo]?.question_type == "Multiple Choice" ?
            <>
                <h3>{questionSets[questionNo]?.question_type}</h3>
                <h1>{questionSets[questionNo]?.question_content}</h1>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "A" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("A")}}>{SplitChoices(questionSets[questionNo]?.question_choices, 1)}</button></div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "B" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("B")}}>{SplitChoices(questionSets[questionNo]?.question_choices, 2)}</button></div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "C" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("C")}}>{SplitChoices(questionSets[questionNo]?.question_choices, 3)}</button></div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "D" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("D")}}>{SplitChoices(questionSets[questionNo]?.question_choices, 4)}</button></div>
                {/* <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div> */}
                <br></br>
            </> : questionSets[questionNo]?.question_type == "True or False" ? 
            <>
                <h2>{questionSets[questionNo]?.question_type}</h2>
                <h1>{questionSets[questionNo]?.question_content}</h1>
                <div id="quiz-content3"><button onClick={()=>{SelectAnswer("True")}} id={answers.current[questionNo] == "True" ? "selected_button_tf" : "true_button"}>True</button></div>
                <div id="quiz-content3"><button onClick={()=>{SelectAnswer("False")}} id={answers.current[questionNo] == "False" ? "selected_button_tf" : "false_button"}>False</button></div>
                {/* <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div> */}
            </> 

            : questionSets[questionNo]?.question_type == "Fill in the Blank" ? 
            <> 
                <h2>{questionSets[questionNo]?.question_type}</h2>
                <h1>{questionSets[questionNo]?.question_content}</h1>
                <br></br>
                <div id="fillDiv">Answer:  <input id="fillInput" autocomplete="off" type="text" placeholder={currentBlankAnswer} onChange={(e) => {FillAnswer(e.target.value)}}></input></div>
                <br></br>
                {/* <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div> */}
            </>
           : ""}
        </div>
        )
    }

    //Gather quiz questions
    useEffect(() =>{
        Axios.get(`${process.env.REACT_APP_API_URL}/api/user/get_questions`).then((response)=>{
          setQuestionSets(response.data);
        console.log(response.data)
        for (let i=0;i<response.data.length;i++){//Creation of answer holder
            answers.current[i] = null
        }
        })
      },[])

    //Check if user has taken a quiz already today
    useEffect(()=>{
        Axios.post(`${process.env.REACT_APP_API_URL}/api/user/get_user_quiz_taken`, {
            Reg_email: localStorage.getItem("email"),
        }).then((response)=>{
            if(response.data[0] != undefined)
                setHasTakenQuizToday(true)
        });
    },[])

    function BeginQuiz(){

        let msg = ""
        if(hasTakenQuizToday)
        msg = "You have already taken an attempt today(1/1). Submitting new answers will not update the previous score."        
        
        else
            msg = "This is your first attempt today(0/1). Taking a quiz for the first time today will be the ones recorded throughout the day."


        Swal.fire({
            icon: 'error',
            title: 'Logged out'
        })

        Swal.fire({
            title: 'Begin Quiz?',
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'No',
            cancelButtonText:'Yes'
        }).then((result) => {
            if(!result.isConfirmed)
                setStarted(true)
        })
        
    }

    function SplitChoices(choices, letter){
        //1 = A   2 = B  3 = C  4 = D
        let result = "";
        if(choices != null){
            switch(letter){
                case 1:
                    result = choices.split(separator)[1]
                    break
                case 2:
                    result = choices.split(separator)[2]
                    break
                case 3:
                    result = choices.split(separator)[3]
                    break
                case 4:
                    result = choices.split(separator)[4]
                    break
                default:
                    break

            }
    }
        // console.log(choices.split(". "))
        // console.log(choices.split(". ")[0].substring(0,choices.split(". ")[1].length-2));
        
        return result;
    }

    return(
        <div className="QuizPage">
            <div className="quizBox">
            <h1 id="quizSign" style={{textAlign: 'center'}}>{prnDt}</h1>
                {started ? <div className="quizInnerDiv">            
                <QuizQuestion/>
                
                {
                questionSets.length === 1 ? (
                    // Case when there's only one question
                    <div class="button-next">
                    <button onClick={FinishQuiz}>Finish</button>
                    </div>
                ) : (
                    // Other cases
                    questionNo+1 === 1 && questionNo+1 !== questionSets.length ? (
                    // First question but not the only one
                    <div class="button-next">
                        <button onClick={NextQuestion}>Next Question</button>
                    </div>
                    ) : questionNo > 0 && questionNo+1 !== questionSets.length ? (
                    // Any middle question
                    <div class="buttons-positioned">
                        <button onClick={PrevQuestion}>Previous Question</button>
                        <button onClick={NextQuestion}>Next Question</button>
                    </div>
                    ) : questionNo+1 === questionSets.length ? (
                    // Last question
                    <div class="buttons-positioned">
                        <button onClick={PrevQuestion}>Previous Question</button>
                        <button onClick={FinishQuiz}>Finish</button>
                    </div>
                    ) : (
                    <div class="button-next">
                        <button onClick={NextQuestion}>Next Question</button>
                    </div>
                    )
                )
                }
                {questionNo+1 + " of " + questionSets.length}
                </div>
                
                : //Not started 

                <>
                    <div className="quiz_instruction">
                       <p>Instructions: Today's quiz has <span style={{color:"blue"}}>{questionSets?.length}</span> item questions of different types
                         such as multiple choice, fill in the blank, and true or false. The questions contained
                       within changes everyday. <br/><br/><strong>NOTE:</strong> Only the first attempt of the quiz is recorded. 
                            Another attempt does not update the first recorded score until the following day.
                       </p>
                    </div>
                    

                    {localStorage.getItem("email") != undefined ?
                    <div className="buttonArea">
                        <button onClick={() => setModal(true)}>
                            <BiHelpCircle /> Help
                        </button>
                        <button onClick={()=>{BeginQuiz()}}>
                            Start Quiz
                        </button>
                    </div>
                    :
                        <>
                            <h3>Please login to take the quiz.</h3>
                            <div className="buttonArea">
                                <button onClick={() => setModal(true)}><BiHelpCircle /> Help</button>
                                <button onClick={enterRegister}>Register</button>
                                <button onClick={enterLogin}>Login</button>
                            </div>
                        </>
                    }
                    {modal && (
        <div className="modal">
          <div onClick={() => setModal(false)} className="overlay"></div>
          <div className="modal-content">
            <h1>Quiz Instructions</h1>
                <img src={fill_blank}/>
                <h2>Multiple Choice</h2>
                <p>Select the corresponding choice based off your desired answer.</p>
                <img src={fil_blank2}/> 
                <h2>Fill in the Blank</h2>
                <p>Input your desired answer in the textbox input by selecting and typing your answer.</p>
                <img src={t_or_f}/>
                <h2>True or False</h2>
                <p>Click the true or false button whether the statement from the question is true or false.</p>
                <p><strong>The whole quiz can be backtracked by clicking the previous button, making it easier to make changes from your answers.</strong></p>
            <button className="close-modal" onClick={() => setModal(false)}>
              <BiX />
            </button>
          </div>
        </div>
      )}
                </>
                
                }
                </div>
            </div>
    )

}
