import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2';
export default function ManageQuiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [questionEditId, setQuestionEditId] = useState(null);
    const [highestID, setHighestID] = useState(0)
    const [questionContent, setQuestionContent] = useState("")
    const [choiceA, setChoiceA] = useState("");
    const [choiceB, setChoiceB] = useState("");
    const [choiceC, setChoiceC] = useState("");
    const [choiceD, setChoiceD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [questionPanel, setQuestionPanel] = useState(false);
    const separator = "`$`";


    useEffect(() =>{
        Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/get_questions`).then((response)=>{
          setQuestionSets(response.data);
        })
      },[questionSets])
    
    useEffect(()=>{
        Axios.get(`${process.env.REACT_APP_API_URL}/api/admin/quiz_id/get`).then((response)=>{
            setHighestID(response.data[0].question_id);
        })

    },[])

    function formatOptions(input) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // Split the input string by the dollar sign and remove any empty elements
        const items = input.split("`$`").filter(item => item.trim() !== '');
        
        // Map each item to a corresponding letter from the alphabet
        return items.map((item, index) => `${alphabet[index]}. ${item.trim()}`).join(' ');
    }
    function EditQuestion(q_id,q_content,choices,corr_answer,q_type){
        setQuestionPanel(true);
        setQuestionContent(q_content);
        setQuestionType(q_type);
        setQuestionEditId(q_id);
        setCorrectAnswer(corr_answer);
        if(q_type == "Multiple Choice") {
            setChoiceA(choices.split("`$`")[1])
            setChoiceB(choices.split("`$`")[2])
            setChoiceC(choices.split("`$`")[3])
            setChoiceD(choices.split("`$`")[4])
        }
    }
    function cancelPanel(){
        setQuestionPanel(false);
        setQuestionEditId(null);
        setQuestionContent("");
        setChoiceA("");
        setChoiceB("");
        setChoiceC("");
        setChoiceD("");
        setCorrectAnswer("");
        setQuestionType("");
    }
    async function AddQuestion(q_type){
        switch(q_type){
            case "Multiple Choice":
                await Axios.post(`${process.env.REACT_APP_API_URL}/api/admin/insert_questions`, {
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
                break;
            default:
                await Axios.post(`${process.env.REACT_APP_API_URL}/api/admin/insert_questions`, {
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
                break;
        }
        setHighestID(highestID+1)
        cancelPanel();
    }
    async function UpdateQuestion(q_id, q_type){
        switch(q_type){
            case "Multiple Choice":
                await Axios.put(`${process.env.REACT_APP_API_URL}/api/quiz_admin/update`,{
                question_id: q_id,
                question_type: questionType,
                question_content: questionContent, 
                question_choices: separator+choiceA+separator+choiceB+separator+choiceC+separator+choiceD,
                correct_answer: correctAnswer
                });
                setQuestionSets(prevQuestionSets => 
                    prevQuestionSets.map(item => 
                      item.question_id === q_id 
                        ? {
                            ...item,
                            question_type: questionType,
                            question_content: questionContent,
                            question_choices: `${separator}${choiceA}${separator}${choiceB}${separator}${choiceC}${separator}${choiceD}`,
                            correct_answer: correctAnswer
                          }
                        : item
                    )
                )
                break;
            default:
                await Axios.put(`${process.env.REACT_APP_API_URL}/api/quiz_admin/update`,{
                question_id: q_id,
                question_type: questionType,
                question_content: questionContent, 
                question_choices: "none",
                correct_answer: correctAnswer
                });
                setQuestionSets(prevQuestionSets => 
                    prevQuestionSets.map(item => 
                      item.question_id === q_id 
                        ? {
                            ...item,
                            question_type: questionType,
                            question_content: questionContent,
                            question_choices: "none",
                            correct_answer: correctAnswer
                          }
                        : item
                    )
                )
                break;
        }
        cancelPanel();
    }

    function DeleteQuestion(q_id){
        Swal.fire({
            title: 'Deleting Question',
            text: "Are you sure you want to delete this question?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B8336A',
            cancelButtonColor: '#333',
            confirmButtonText: 'Yes',
            cancelButtonText:'No'
        }).then((result) => {
            if(result.isConfirmed){
                Axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/delete_question/${q_id}`);
                const updatedQuestions = questionSets.filter(val => val.question_id != q_id);
                setQuestionSets([...updatedQuestions]);
                if(questionSets.length == 1)
                Axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/truncate_question`);
            }
        })
    }

    async function DeleteAllQuestions(){
        Swal.fire({
            title: 'Deleting All Questions!',
            text: "Are you sure you want to delete ALL questions?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B8336A',
            cancelButtonColor: '#333',
            confirmButtonText: 'Yes',
            cancelButtonText:'No'
        }).then((result) => {
            if(result.isConfirmed){
                Axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/truncate_question`);
                setQuestionSets([]);
            }
        })
    }
    return(
    <div className="DashboardPage">
        <div className="BackendPage">
            <div className="quizBox">
                <h1 className="siteTitle">Quiz Management</h1>
                {questionPanel ? 
                            <div className="quizInnerDiv">
                            <h1>Question Type</h1>
                            <select 
                                className="quiz-maker-select" 
                                onChange={(event)=>setQuestionType(event.target.value)} 
                                name="type" 
                                id="type"
                                value={questionType}
                            >
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="Fill in the Blank">Fill in the Blank</option>
                                <option value="True or False">True or False</option>
                            </select>
                            <h1>Question Content</h1>
                            <textarea
                                rows="3"
                                placeholder="Enter Question Content..."
                                className="quiz-maker-choices-input"
                                id="question_content"
                                cols="50"
                                value={questionContent}
                                onChange={(e) => {setQuestionContent(e.target.value)}}
                                name="comment"
                            />
                            <div className='quizBody'>
                                <div className="quizAnswers">
                                <div className="quizBodyLabel">
                                    <h1>Question Answer</h1>
                                </div>
                                {questionType == "Multiple Choice" ?
                                    <>
                                        <div className="multipleChoicesAnswer">
                                            <input
                                                className="multipleChoicesRadio"
                                                type="radio"
                                                value="A"
                                                name="choices_radio"
                                                checked={correctAnswer == "A"}
                                                onChange={(e)=>{setCorrectAnswer(e.target.value)}}
                                            />
                                            <input 
                                                className="multipleChoicesText"
                                                name="A" 
                                                placeholder="A." 
                                                type="text" 
                                                value={choiceA} 
                                                onChange={(e) => {setChoiceA(e.target.value)}}
                                            />
                                        </div>
                                        <div className="multipleChoicesAnswer">
                                            <input
                                                className="multipleChoicesRadio"
                                                type="radio"
                                                value="B"
                                                name="choices_radio"
                                                checked={correctAnswer == "B"}
                                                onChange={(e)=>{setCorrectAnswer(e.target.value)}}
                                            />
                                            <input 
                                                className="multipleChoicesText"
                                                name="B" 
                                                placeholder="B." 
                                                type="text" 
                                                value={choiceB} 
                                                onChange={(e) => {setChoiceB(e.target.value)}}
                                            />
                                        </div>
                                        <div className="multipleChoicesAnswer">
                                            <input
                                                className="multipleChoicesRadio"
                                                type="radio"
                                                value="C"
                                                name="choices_radio"
                                                checked={correctAnswer == "C"}
                                                onChange={(e)=>{setCorrectAnswer(e.target.value)}}
                                            />
                                            <input 
                                                className="multipleChoicesText"
                                                name="C" 
                                                placeholder="C." 
                                                type="text" 
                                                value={choiceC} 
                                                onChange={(e) => {setChoiceC(e.target.value)}}
                                            />
                                        </div>
                                        <div className="multipleChoicesAnswer">
                                            <input
                                                className="multipleChoicesRadio"
                                                type="radio"
                                                value="D"
                                                name="choices_radio"
                                                checked={correctAnswer == "D"}
                                                onChange={(e)=>{setCorrectAnswer(e.target.value)}}
                                            />
                                            <input 
                                                className="multipleChoicesText"
                                                name="D" 
                                                placeholder="D." 
                                                type="text" 
                                                value={choiceD} 
                                                onChange={(e) => {setChoiceD(e.target.value)}}
                                            />
                                        </div>
                                    </>
                                : questionType == "Fill in the Blank" ?
                                    <>
                                        <input 
                                        type="text" 
                                        className="fillAnswer"
                                        value={
                                            correctAnswer != "A" &&
                                            correctAnswer != "B" &&
                                            correctAnswer != "C" &&
                                            correctAnswer != "D" &&
                                            correctAnswer != "True" &&
                                            correctAnswer != "False" ?
                                            correctAnswer
                                            :
                                            ""
                                        }
                                        placeholder="Correct Answer..." 
                                        onChange={(e) => {setCorrectAnswer(e.target.value)}}
                                        />
                                    </>
                                : questionType == "True or False" ? 
                                    <>
                                        <button onClick={()=>{setCorrectAnswer("True")}} id={correctAnswer == "True" ? "selected_button_tf" : "true_button"}>
                                            True
                                        </button>
                                        <button onClick={()=>{setCorrectAnswer("False")}} id={correctAnswer == "False" ? "selected_button_tf" : "false_button"}>
                                            False
                                        </button>
                                    </>
                                :
                                ""}
                                </div>
                            </div>
                            <div className="quizButtonArea">
                                {questionEditId != null ?
                                <button 
                                onClick={()=>{(UpdateQuestion(questionEditId, questionType))}}
                                className="addQuestionButton">
                                    Update Question
                                </button>
                                :
                                <button 
                                onClick={()=>{(AddQuestion(questionType))}}
                                className="addQuestionButton">
                                    Add Question
                                </button>}

                                <button 
                                onClick={()=>{cancelPanel()}}
                                className="deletebtn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        :
                        <div className="quizInnerDivManagement">
                        <div className="questions">
                            <div className="quizButtonArea">
                                <button className="mainBtn" onClick={()=>{setQuestionPanel(true)}}>Add Question</button>
                                <button className="deletebtn" onClick={()=>{DeleteAllQuestions()}}>Delete ALL Questions</button>
                            </div>
                        </div>
                        {questionSets.map((val, index)=> 
                        <div className="questions">
                            <h1>Question ID {val.question_id}</h1>
                            <h3>{val.question_type}</h3>
                            <p>{val.question_content}</p>
                            {val.question_choices != 'none' ?
                            <h3>{formatOptions(val.question_choices)}</h3>
                            : null}
                            <h2>Answer: {val.correct_answer}</h2>
                            <div className="quizButtonArea">
                                <button className="mainBtn" onClick={()=>{EditQuestion(val.question_id, val.question_content, val.question_choices, val.correct_answer, val.question_type)}}>Edit Question</button>
                                <button className="deletebtn" onClick={()=>{DeleteQuestion(val.question_id)}}>Delete Question</button>
                            </div>
                        </div>
                        )
                        }
                        </div>}
            </div>
        </div>
    </div>
    )
}