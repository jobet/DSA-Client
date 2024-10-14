import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import members from '../images/members.svg';
import linear from '../images/linear.svg';
import nonlinear from '../images/nonlinear.svg';
import HomeVideo from '../images/HomeVideo.webm';
import HomeVideoImg from '../images/HomeVideo.webp';

export default function Home(){
    useEffect(() => {
        const videoElement = document.getElementById("homeVideo");
        if (videoElement) {
            videoElement.playbackRate = 2;
        }
    }, []);
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
                <h3 className='message2'>Learn how most data structures and algorithms work through animated visualizers!</h3>
            </div>
            <div className='video-container'>
                <video id="homeVideo" autoPlay loop muted playsInline className='background-video'>
                    <source src={HomeVideo} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                <div className='video-overlay'></div>
            </div>
            <div className='box2'>
                <div className="imgSection">
                    <img src={members} className="aboutImg"/>
                </div>
                <div className="descSection">
                    <h1 id="typer0" >About DSA Visual</h1>
                    <p>
                        DSA Visualizer or Data Structures and Algorithms Visualizer is a website created for the purposes of 
                        hosting animated visualizers fo data structures like queue, linked list, and trees as well as algorithms 
                        such as sorting and path finding algorithms.This website was made through a collaborate effort from a group of computer science students for the
                        accomplishment of their Software Engineering requirement. 
                    </p>
                </div>
            </div>
            <div className='box2'>
                <div className='oneSection'>
                    <h1>What are Data Structures?</h1>
                    <p>
                        Data structure is a storage that is used to store and organize data. It is a way of arranging data on a computer so that it can be accessed and updated efficiently.
                        Depending on your requirement and project, it is important to choose the right data structure for your project.
                    </p>
                    <h1>Types of Data Structure</h1>
                    <div className="typeSection">
                        <div className="type">
                            <img src={linear}/>
                            <div>
                                <h2>Linear data structure</h2>
                                <p>
                                    In linear data structures, the elements are arranged in sequence one after the other. Since elements are arranged in particular order, they are easy to implement.
                                    However, when the complexity of the program increases, the linear data structures might not be the best choice because of operational complexities.
                                    Some popular linear data structures are array, stack, queue and linked list.
                                </p>
                            </div>
                        </div>
                        <div className="type">
                            <img src={nonlinear} />
                            <div>
                                <h2> Non-linear data structure</h2>
                                <p>
                                    Unlike linear data structures, elements in non-linear data structures are not in any sequence. Instead they are arranged in a hierarchical manner where one element will be connected to one or more elements.
                                    Non-linear data structures are further divided into graph and tree based data structures.
                                </p>
                            </div>
                        </div>
                    </div>
                    <h1>Why Use Data Structure?</h1>
                    <p>
                        Knowledge about data structures help you understand the working of each data structure. And, based on that you can select the right data structures for your project.
                        This helps you write memory and time efficient code.
                    </p>
                </div>
            </div>
            <div className='box2'>
                <div className="oneSection">
                <h1>What is an Algorithm?</h1>
                <p>
                    In computer programming terms, an algorithm is a set of well-defined instructionsto solve a particular problem. It takes a set of input and produces a desired output.                     Algorithmic thinking, or the ability to define clear steps to solve a problem, is crucial in many different fields. Even if we’re not conscious of it, we use algorithms and algorithmic thinking all the time. Algorithmic thinking allows students to break down problems and conceptualize solutions in terms of discrete steps. Being able to understand and implement an algorithm requires students to practice structured thinking and reasoning abilities.
                </p>
                <h1>Qualities of Good Algorithms</h1>
                <ul>
                    <li><p>Input and output should be defined precisely.</p></li>
                    <li><p>Each step in the algorithm should be clear and unambiguous.</p></li>
                    <li><p>Algorithms should be most effective among many different ways to solve a problem.</p></li>
                    <li><p>An algorithm shouldn't include computer code. Instead, the algorithm should be written in such a way that it can be used in different programming languages.</p></li>
                </ul>
                </div>
            </div>
        </div>
    </>
        
        
    );
}