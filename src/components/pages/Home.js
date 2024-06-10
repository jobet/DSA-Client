import React from 'react';
import Typewriter from 'typewriter-effect';
import members from '../images/members.png';
import {Link} from 'react-router-dom';



export default function Home(){
    return(
        <div className='Home'>
                <div className='box1'>
                <h1 id='typer1' >
                <Typewriter id='typer0'
                    onInit={(Typewriter) => {
                        Typewriter 
                        .typeString("Welcome to DSA Visualizer!")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString("Select an algorithm or data structure.")
                        .start();
                        
                    }}
                />
                </h1>
                <div className='message2' ><h3 className='message2'>Log in or Register to join our discussion board and to take the daily quiz!</h3></div><br/><br/>
                    <Link to='/login-form' className='newlogin'> Login/Register</Link>
                </div>
                
                <div className='box2'>
                    <img className= "members-image"src={members}/>
                    <h1 id="typer2" >About DSA Visualizer</h1>
                    <p>
                        DSA Visualizer or Data Structures and Algorithms Visualizer is a website created for the purposes of 
                        hosting animated visualizers fo data structures like queue, linked list, and trees as well as algorithms 
                        such as sorting and path finding algorithms.This website was made through a collaborate effort from a group of computer science students for the
                        accomplishment of their Software Engineering requirement. 
                    </p>
                    <br/>
                </div>
          
        </div>
        
        
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