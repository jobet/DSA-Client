import React from 'react';
import noSort from './images/noSort.PNG';
import sortSpeed from './images/sortSpeed.PNG';
import sortBtn from './images/sortBtn.PNG';
import sortType from './images/sortType.png';
import { BiHelpCircle, BiPlayCircle, BiX, BiDice5  } from "react-icons/bi";
class Navbar extends React.Component {  
    state = {
        modal: false,
        algoInfoModal: false
    };
    render() {
        return (
            <>
                <div className="buttonArea">
                    <button id="help" onClick={() => this.setState({ modal: true })}>
                        <BiHelpCircle/> Help
                    </button>
                    <button id="random" onClick={() => this.props.newList(1)}>
                        <BiDice5 /> Randomize
                    </button>
                    <button id="start" onClick={() => this.props.start()}>
                        <BiPlayCircle/> Start
                    </button>
                </div>
                {this.state.modal && (
                    <div className="modal">
                        <div onClick={() => this.setState({ modal: false })} className="overlay"></div>
                        <div id="modal-instruction" className="modal-content">
                            <h1>Sorting Instructions</h1>
                            <div className="modalSeparator">
                                <p>Select the sorting algorithm you want to visualize.</p>
                                <img src={sortType} alt="Select Sorting Algorithm"/>
                            </div>
                            <div className="modalSeparator">
                                <p>You can change the amount of items to sort by dragging the slider.</p>
                                <img src={noSort} alt="No sort" />
                            </div>
                            <div className="modalSeparator">
                                <p>You can change the speed by dragging the slider.</p>
                                <img src={sortSpeed} alt="Sort speed" />
                            </div>
                            <div className="modalSeparator">
                                <p>Randomize allows you to generate new set of items.</p>
                                <p>The Start button will begin the sorting process.</p>
                                <img src={sortBtn} alt="Sort button" />   
                            </div>
                            <button className="close-modal" onClick={() => this.setState({ modal: false })}>
                                <BiX/>
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Navbar;