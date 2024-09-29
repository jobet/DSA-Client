import React from 'react';
import "../functions/modal.css";
import Visualizer from './sortingVisualizer.jsx';
import './sorting.css';
import 'react-tabs/style/react-tabs.css';


export default function Sorting(){
    return (
        <div className='Sorting'>
                <div className='visualizerArea'>
                    <Visualizer />
                </div>  
        </div>
      );
} 