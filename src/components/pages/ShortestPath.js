import React,{useState} from 'react';
import PathfindingVisualizer from '../pathFindingVisualizer/PathfindingVisualizer'
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../functions/modal.css";
export default function ShortestPath(){
    return(
        <div className='ShortestPath'>
            <PathfindingVisualizer />
        </div>
    );
}