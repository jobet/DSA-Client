import React,{useState} from 'react';
import Collapsible from '../functions/Collapsible.js';
import Dsa from './Dsa.js';
import SideCollapsible from '../functions/SideCollapsible.js';
import { useHistory } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../functions/modal.css";

export default function DataStructures(){
    let history = useHistory();

    function enterAVL(){
        history.push("/AVL");
    }

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
      }
      else {
        document.body.classList.remove('active-modal')
      };
    

    return(
        <div className='DataStructures'>
            <div className="dsaContainer">
            <Dsa />
            <button className='AVl-redirect-button' onClick={enterAVL}>AVL</button>
            {modal && (
                <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Data Structures Instructions</h2>
                    <p>To select a data structure, press the select data structure button.</p>
                    <p>
                    The AVL button redirects you to the AVL visualizer page.
                    </p>
                    <p>In the input data field, you can input your own data array. Sample data values are provided.
                    </p>
                    <p>
                    To start the visualization process, press the start button.
                    </p>
                    <p>
                    Once the visualization has started, you can stop the visualization.
                    </p>
                    <p>
                    Once stopped, an option to restart will appear.
                    </p>
                    <button className="close-modal" onClick={toggleModal}>
                    x
                    </button>
                </div>
                </div>
            )}
            </div>
        </div>
    );
}