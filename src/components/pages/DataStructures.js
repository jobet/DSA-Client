import React from 'react';
import Dsa from './Dsa.js';
import { useHistory } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import "../functions/modal.css";

export default function DataStructures(){
    let history = useHistory();
    function enterAVL(){
        history.push("/AVL");
    }
    return(
        <div className='DataStructures'>
            <div className="dsaContainer">
                <h1 style={{textAlign:"center"}}>Data Structures</h1>
                <Dsa />
                <button style={{display: 'none'}} onClick={enterAVL}>AVL</button>
            </div>
        </div>
    );
}