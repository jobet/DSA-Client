import React from 'react';
import "../functions/modal.css";
import Visualizer from './sortingVisualizer.jsx';
import './sorting.css';

export default function Sorting(){
    return (
        <div className='Sorting'>
                <div className='visualizerArea'>
                    <h1 className="siteTitle">Sorting Algorithms</h1>
                    <Visualizer />
                </div>  
        </div>
      );
} 