import React from 'react';
import Typewriter from 'typewriter-effect';
import members from '../images/members.png';
import {Link} from 'react-router-dom';



export default function Home(){
    return(
        <>
        <div className='Home'>
                <div className='box1'>
                <h1 id='typer1' >
                <Typewriter id='typer0'
                    onInit={(Typewriter) => {
                        Typewriter 
                        .typeString("Visualizers for Data Structures and Algorithms")
                        .start();
                    }}
                />
                </h1>
                <div className='message2' ><h3 className='message2'>Learn how most data structures and algorithms work through animated visualizers!</h3></div><br/><br/>
                    <Link to='/login-form' className='newlogin'>Get Started</Link>
                </div>
                
                <div className='box2'>
                    <div className="imgSection">
                    <img src={members} width={500}/>
                    </div>
                    <div className="descSection">
                    <h1 id="typer0" >About DSA Visualizer</h1>
                    <p>
                        DSA Visualizer or Data Structures and Algorithms Visualizer is a website created for the purposes of 
                        hosting animated visualizers fo data structures like queue, linked list, and trees as well as algorithms 
                        such as sorting and path finding algorithms.This website was made through a collaborate effort from a group of computer science students for the
                        accomplishment of their Software Engineering requirement. 
                    </p>
                    </div>
                </div>
          
        </div>
        <div className='Information'>

    
    
        <div className='InformationBox1'>
            <div className='leftInfo'>
                <div className='rounded-container'>
            <h1>What are Data Structures?</h1><br/>
            Data structure is a storage that is used to store and organize data. It is a way of arranging data on a computer so that it can be accessed and updated efficiently.

            Depending on your requirement and project, it is important to choose the right data structure for your project.
            <br/><br/>

            <h1>Types of Data Structure</h1>
            <br/>

            <ul style={{marginLeft:'30px'}}>
                <li><h2>Linear data structure</h2></li>
                <p>In linear data structures, the elements are arranged in sequence one after the other. Since elements are arranged in particular order, they are easy to implement.
                However, when the complexity of the program increases, the linear data structures might not be the best choice because of operational complexities.
                Some popular linear data structures are array, stack, queue and linked list.
                </p>
                <br/>
                <li><h2> Non-linear data structure</h2></li>
                Unlike linear data structures, elements in non-linear data structures are not in any sequence. Instead they are arranged in a hierarchical manner where one element will be connected to one or more elements.
                Non-linear data structures are further divided into graph and tree based data structures.

                </ul>
                <br/><h1>Why Use Data Structure?</h1><br/>
                Knowledge about data structures help you understand the working of each data structure. And, based on that you can select the right data structures for your project.

                This helps you write memory and time efficient code.
                </div>
            </div>
            <div className='rightInfo' >           
            </div>
        </div>
        
        <div className='InformationBox2'>
            <div className='leftInfo'>
               
                <div className="rounded-container">
            <h1>What is an Algorithm?</h1><br/>

                In computer programming terms, an algorithm is a set of well-defined instructionsto solve a particular problem. It takes a set of input and produces a desired output. For example,

                An algorithm to add two numbers:
                <ul style={{marginLeft:'30px'}}>
                <li>Take two number inputs</li>
                <li>Add numbers using the + operator</li>
                <li>Display the result</li>

                </ul><br/>
                <h1>Qualities of Good Algorithms</h1><br/>
                <ul style={{marginLeft:'30px'}}>
                    <li>Input and output should be defined precisely.</li>
                    <li>Each step in the algorithm should be clear and unambiguous.</li>
                    <li>Algorithms should be most effective among many different ways to solve a problem.</li>
                    <li>An algorithm shouldn't include computer code. Instead, the algorithm should be written in such a way that it can be used in different programming languages.</li>
                </ul><br/>
                <h1>Importance of Algorithms</h1><br/>
                Algorithmic thinking, or the ability to define clear steps to solve a problem, is crucial in many different fields. Even if we’re not conscious of it, we use algorithms and algorithmic thinking all the time. Algorithmic thinking allows students to break down problems and conceptualize solutions in terms of discrete steps. Being able to understand and implement an algorithm requires students to practice structured thinking and reasoning abilities.
            <br/><br/><a href='https://www.programiz.com/dsa/algorithm' style={{color:'black'}} target={"_blank"}>Additional Information</a>
            </div>        
            </div>
        </div>

    </div>
    </>
        
        
    );
} 

// export default function Home(){
//     return(
//         <div className='Home'>
//       {(() => {
//         if (ReactSession.get('username')) {
//           return (
//             <div><h1>Logged in {ReactSession.get('username')}</h1></div>
//           )
//         }  else {
//           return (
//             <div><h1>Not logged in</h1></div>
//           )
//         }
//       })()}
          
//         </div>
        
        
//     );
// } 