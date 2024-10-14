import React from 'react';
import Dsa from './Dsa.js';
import 'react-tabs/style/react-tabs.css';
export default function DataStructures(){
    return(
        <div className='DataStructures'>
            <div className="dsaContainer">
                <h1 className="siteTitle">Data Structures</h1>
                <Dsa />
            </div>
        </div>
    );
}