import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import { answers_sets } from './QuizData';
export default function ManageQuiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const [highestID, setHighestID] = useState(0)
    const [questionContent, setQuestionContent] = useState("")
    const [choiceA, setChoiceA] = useState("");
    const [choiceB, setChoiceB] = useState("");
    const [choiceC, setChoiceC] = useState("");
    const [choiceD, setChoiceD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const separator = "`$`";


    useEffect(() =>{
        Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/get_questions`).then((response)=>{
          setQuestionSets(response.data);
        //   console.log(response.data)
        })
      },[questionSets])
    
    useEffect(()=>{
        Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/quiz_id/get`).then((response)=>{
            setHighestID(response.data[0].question_id);
        })

    },[])


    function AddQuestion(q_type){

        switch(q_type){
            case "Multiple Choice":
                Axios.post(`${process.env.REACT_APP_API_URL}/api/admin/insert_questions`, {
                question_type: questionType,
                question_content: questionContent, 
                question_choices: separator+choiceA+separator+choiceB+separator+choiceC+separator+choiceD,
                correct_answer: correctAnswer
                });
                setQuestionSets([
                ...questionSets,
                { question_id: highestID+1,
                    question_type: questionType,
                    question_content: questionContent, 
                    question_choices:  separator+choiceA+separator+choiceB+separator+choiceC+separator+choiceD,
                    correct_answer: correctAnswer
                    },
                ])
                                setCorrectAnswer("")
                break;
            case "Fill in the Blank":
                Axios.post(`${process.env.REACT_APP_API_URL}/api/admin/insert_questions`, {
                question_type: questionType,
                question_content: questionContent, 
                question_choices: "none",
                correct_answer: correctAnswer
                });
                setQuestionSets([
                ...questionSets,
                { question_id: highestID+1,
                    question_type: questionType,
                    question_content: questionContent, 
                    question_choices:  "none",
                    correct_answer: correctAnswer
                    },
                ])
                setCorrectAnswer("")
                break;
            case "True or False":
                Axios.post(`${process.env.REACT_APP_API_URL}/api/admin/insert_questions`, {
                question_type: questionType,
                question_content: questionContent, 
                question_choices: "none",
                correct_answer: correctAnswer
                });
                setQuestionSets([
                ...questionSets,
                { question_id: highestID+1,
                    question_type: questionType,
                    question_content: questionContent, 
                    question_choices:  "true"+separator+"false",
                    correct_answer: correctAnswer
                    },
                ])
                setCorrectAnswer("True");
                break;
            default:
                break;
        }
        setQuestionContent("")
        setChoiceA("")
        setChoiceB("")
        setChoiceC("")
        setChoiceD("")
        setHighestID(highestID+1)

        console.log(questionSets)

        let quest_content = document.getElementById("question_content");
        quest_content.value = "";

    }

    const [questionEditId, setQuestionEditId] = useState(-1) 
    const [editMode, setEditMode] = useState(false)
    const [tempQuestionContent, setTempQuestionContent] = useState("")
    const [tempChoiceA, setTempChoiceA] = useState("");
    const [tempChoiceB, setTempChoiceB] = useState("");
    const [tempChoiceC, setTempChoiceC] = useState("");
    const [tempChoiceD, setTempChoiceD] = useState("");
    const [tempCorrectAnswer, setTempCorrectAnswer] = useState("");
    const [tempQuestionType, setTempQuestionType] = useState("");

    function EditQuestion(q_id,q_content,choices,corr_answer,q_type){
        if(editMode){
            setEditMode(false)
            setQuestionEditId(-1)
            setTempChoiceA("")
            setTempChoiceB("")
            setTempChoiceC("")
            setTempChoiceD("")
        }
        else{
            setTempQuestionContent(q_content)
            if(q_type == "Multiple Choice")
            {
                setTempChoiceA(choices.split("`$`")[1])
                setTempChoiceB(choices.split("`$`")[2])
                setTempChoiceC(choices.split("`$`")[3])
                setTempChoiceD(choices.split("`$`")[4])
            }
            setTempCorrectAnswer(corr_answer)
            setTempQuestionType(q_type)

            setQuestionEditId(q_id)
            setEditMode(true)
        }
    }

    function UpdateQuestion(q_id){
        if(tempQuestionType == "Multiple Choice"){
            console.log("Question ID:"+q_id+" Type:"+tempQuestionType+
            " content:" +tempQuestionContent + " choices: " +
           separator + tempChoiceA+separator+tempChoiceB+separator+tempChoiceC+separator+tempChoiceD+separator
             + " answer:"+tempCorrectAnswer)

             setQuestionSets(questionSets.map((val) => {   //maps comment for updating
                return val.question_id == q_id?{question_id:q_id,
                    question_type:tempQuestionType,question_content:tempQuestionContent,
                    question_choices:separator+tempChoiceA+separator+tempChoiceB+separator+tempChoiceC+
                    separator+tempChoiceD+separator,correct_answer:tempCorrectAnswer}:val
              }))

              Axios.put(`${process.env.REACT_APP_API_URL}/api/quiz_admin/update`,{
                question_id: q_id,
                question_type: tempQuestionType,
                question_content: tempQuestionContent,
                question_choices: separator+tempChoiceA+separator+tempChoiceB+separator+tempChoiceC+
                separator+tempChoiceD+separator,
                correct_answer:tempCorrectAnswer
              } )
        }
        else{
            console.log("Question ID:"+q_id+" Type:"+tempQuestionType+
            " content:" +tempQuestionContent + " choices: " 
            + "none" + " answer:"+tempCorrectAnswer)
            setQuestionSets(questionSets.map((val) => {   //maps comment for updating
                return val.question_id == q_id?{question_id:q_id,question_type:tempQuestionType,question_content:tempQuestionContent,question_choices:"none",correct_answer:tempCorrectAnswer}:val
              }))

              Axios.put(`${process.env.REACT_APP_API_URL}/api/quiz_admin/update`,{
                question_id: q_id,
                question_type: tempQuestionType,
                question_content: tempQuestionContent,
                question_choices: "none",
                correct_answer:tempCorrectAnswer
              } )
        }
        setEditMode(false)
    }

    function DeleteQuestion(q_id){
        console.log(questionSets)
        Axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/delete_question/${q_id}`);
          const updatedQuestions = questionSets.filter(val => val.question_id != q_id);
          setQuestionSets([...updatedQuestions]);
        console.log(questionSets)

        if(questionSets.length == 1)
            Axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/truncate_question`);
    }

    function ChangeQuestionType(event){
        setQuestionType(event.target.value)
        switch(event.target.value)
        {
            case "Fill in the Blank":
                setCorrectAnswer("");
                break;
            case "Multiple Choice":
                setCorrectAnswer("");
                break;
            case "True or False":
                setCorrectAnswer("True");
                break;
            default:
                break;
        }
    }

    function ChangeCorrectAnswer(event){
        setCorrectAnswer(event.target.value)
    }

    function ChangeBGColor(q_type){
        let colors = {"Fill in the Blank":"yellow", "Multiple Choice":"orange", "True or False":"pink"};
        return colors[q_type]
    }


    return(
    <div style={{backgroundColor:"rgb(216, 243, 255)"}}>

        <div class="quiz-maker-container">
            <h1>Quiz Management</h1>
            <br></br>
            <label className="quiz-maker-label">Question Type</label>
            <br></br>
            <select className="quiz-maker-select" onChange={(event)=>ChangeQuestionType(event)} name="type" id="type">
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
            <option value="True or False">True or False</option>
            </select>
            <br></br>
            <label className="quiz-maker-label" style={{"font-size":"26px"}}>Content:</label>
            <br></br>
            <textarea rows="3" placeholder="Enter Question Content..." className="quiz-maker-choices-input" id="question_content" cols="50" onChange={(e) => {setQuestionContent(e.target.value)}} name="comment"/>
                <br></br>
            {questionType == "Multiple Choice" ? <div>
            <label className="quiz-maker-label" style={{"font-size":"26px"}}>Choices:</label>
            
                    <div className='question-admin-choices-container'>
                        <label>A.</label><input className="quiz-maker-choices-input" name="A" placeholder="Choice A..." type="text" value={choiceA} onChange={(e) => {setChoiceA(e.target.value)}}></input>
                        <label>C.</label><input className="quiz-maker-choices-input" name="C" placeholder="Choice C..." type="text" value={choiceC} onChange={(e) => {setChoiceC(e.target.value)}}></input>
                        
                    </div>
                    <div className="question-admin-choices-container">
                    <label>B.</label><input className="quiz-maker-choices-input" name="B" placeholder="Choice B..." type="text" value={choiceB} onChange={(e) => {setChoiceB(e.target.value)}}></input>
                    <label>D.</label><input className="quiz-maker-choices-input" type="text" placeholder="Choice D..." value={choiceD} name="email" id="log_email" onChange={(e) => {
                                    setChoiceD(e.target.value)
                                    }} ></input>
                    </div>
                    
                <br></br>
            <label className="quiz-maker-label" style={{"font-size":"26px"}}>Correct Answer:</label>
<div class="choices_admin_quiz">
    <label>A</label><input type="radio" value="A" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> 
    <label>B</label><input type="radio" value="B" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> 
    <label>C</label><input type="radio" value="C" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> 
    <label>D</label><input type="radio" value="D" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> 

</div>
            </div>
            : questionType == "Fill in the Blank" ?  <div>
            <input type="text" className="quiz-maker-choices-input" placeholder="Correct Answer..." onChange={(e) => {setCorrectAnswer(e.target.value)}}></input></div> : questionType == "True or False" ? 
            <div>
                <label className="quiz-maker-label" style={{"font-size":"26px"}}>Correct Answer:</label>
                <br></br>
                <select className="quiz-maker-select" onChange={(event)=>ChangeCorrectAnswer(event)} name="type" id="type">
                <option value="True">True</option>
                <option value="False">False</option>
                </select>
            </div> :""}

            <br></br>
            <button class="quiz-maker-add_button" onClick={()=>{(AddQuestion(questionType))}}>Add Question</button>

            
        </div>
        <div className="quiz_admin_container">
            {questionSets.map((val, index)=> 
            <div className="questions">
                <div id="admin-quiz-content"><h1>Question {index+1}</h1></div>
                <div id="quiz-content1"><strong>{val.question_type}</strong></div>
                <div id="quiz-content2">{val.question_content}</div>
                <div id="quiz-content3">Choices:{val.question_choices}</div>
                <div id="quiz-content4">Correct Answer: {val.correct_answer}</div>
    
    
                <button class="quiz_editButton" onClick={()=>{EditQuestion(val.question_id, val.question_content, val.question_choices, val.correct_answer, val.question_type)}}>Edit Question</button>
                {editMode && questionEditId == val.question_id ? 
                <div>
                    <div className="questions">
                        <strong><label>Type:</label></strong>
                        <select onChange={(event)=>setTempQuestionType(event.target.value)} name="type" id="type">
                        <option selected={val.question_type == "Multiple Choice"} value="Multiple Choice">Multiple Choice</option>
                        <option selected={val.question_type == "Fill in the Blank"} value="Fill in the Blank">Fill in the Blank</option>
                        <option selected={val.question_type == "True or False"} value="True or False">True or False</option>
                        </select>
                        <br></br>
                        <strong><label>Content:</label></strong>
                        <br></br>
                        <textarea rows="5" placeholder="Enter Question Content..." className="quiz-maker-choices-input" id="question_content" value={tempQuestionContent} cols="45" onChange={(e) => {setTempQuestionContent(e.target.value)}} name="comment"/>
                            <br></br>
                        {tempQuestionType == "Multiple Choice" ? <div>
                        <strong><label>Choices:</label></strong>
                            {/* <br></br>
                            <label>A.</label><input name="A" className="quiz-maker-choices-input" placeholder="Choice A" type="text" value={tempChoiceA} onChange={(e) => {setTempChoiceA(e.target.value)}}></input>
                            <br></br>
                            <label>B.</label><input name="B" className="quiz-maker-choices-input" placeholder="Choice B" type="text" value={tempChoiceB} onChange={(e) => {setTempChoiceB(e.target.value)}}></input>
                            <br></br>
                            <label>C.</label><input name="C" className="quiz-maker-choices-input" placeholder="Choice C" type="text" value={tempChoiceC} onChange={(e) => {setTempChoiceC(e.target.value)}}></input>
                            <br></br>
                            <label>D.</label><input type="text" className="quiz-maker-choices-input" placeholder="Choice D" value={tempChoiceD} name="email" id="log_email" onChange={(e) => {
                                    setTempChoiceD(e.target.value)
                                    }} ></input>
                            <br></br> */}
        
                            <div className="question-admin-choices-container" style={{margin:""}}>
                                <div>
                                    <label>A.</label><input name="A" className="quiz-maker-choices-edit-input" placeholder="Choice A..." type="text" value={tempChoiceA} onChange={(e) => {setTempChoiceA(e.target.value)}}></input>
                                    
                                    <label>B.</label><input name="B" className="quiz-maker-choices-edit-input" placeholder="Choice B..." type="text" value={tempChoiceB} onChange={(e) => {setTempChoiceB(e.target.value)}}></input>
                                    
                                </div>

                                <div>
                                    <label>C.</label><input name="C" className="quiz-maker-choices-edit-input" placeholder="Choice C..." type="text" value={tempChoiceC} onChange={(e) => {setTempChoiceC(e.target.value)}}></input>
                                   
                                    <label>D.</label><input type="text" className="quiz-maker-choices-edit-input" placeholder="Choice D..." value={tempChoiceD} name="email" id="log_email" onChange={(e) => {
                                            setTempChoiceD(e.target.value)
                                            }} ></input>
                                </div>
                            </div>
                            
    
                        <strong><label>Correct Answer:</label></strong>
                            <div class="choices_admin_quiz" style={{paddingTop:"0px"}}>
                            {/* checked={val.correct_answer == "A"} */}
                               <label>A</label> <input type="radio" value="A" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> 
                               <label>B</label> <input type="radio" value="B" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> 
                               <label>C</label> <input type="radio" value="C" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> 
                               <label>D</label> <input type="radio" value="D" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> 
                            </div>
                        </div>
    
                        : tempQuestionType == "Fill in the Blank" ?  <div><strong><label>Correct Answer:</label></strong>
                        <input className="quiz-maker-choices-edit-input" type="text" value={tempCorrectAnswer} onChange={(e) => {setTempCorrectAnswer(e.target.value)}}></input></div> 
                        : tempQuestionType == "True or False" ? 
                        <div>
                            <strong><label>Correct Answer:</label></strong>
                            <select onChange={(event)=>setTempCorrectAnswer(event.target.value)} name="type" id="type">
                            <option selected={val.correct_answer == "True"} value="True">True</option>
                            <option selected={val.correct_answer == "False"} value="False">False</option>
                            </select>
                        </div> :""}
                        <button onClick={()=>{UpdateQuestion(val.question_id)}}>Done</button>
                </div>
                </div> 
                : 
                <div></div>}
    
                <button class="quiz_deleteButton" onClick={()=>{DeleteQuestion(val.question_id)}}>Delete Question</button>
            </div>
            )
            }
        </div>
        <br></br>
    </div>
    )

    
}