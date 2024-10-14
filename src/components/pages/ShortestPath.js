import React from 'react';
import PathfindingVisualizer from '../pathFindingVisualizer/PathfindingVisualizer'
import 'react-tabs/style/react-tabs.css';
export default function ShortestPath(){
    return(
        <div className='ShortestPath'>
            <PathfindingVisualizer />
        </div>
    );
}