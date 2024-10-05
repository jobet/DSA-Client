import React from 'react';
import noSort from './images/noSort.PNG';
import sortSpeed from './images/sortSpeed.PNG';
import sortBtn from './images/sortBtn.PNG';
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
                        <div className="modal-content">
                            <h1>Sorting Instructions</h1>
                            <img src={noSort} alt="No sort" />
                            <p>To select the number of items to sort click on the dropdown menu as shown in the image.</p>
                            <img src={sortSpeed} alt="Sort speed" />
                            <p>Select the sorting speed by clicking the dropdown menu.</p>
                            <img src={sortBtn} alt="Sort button" />
                            <p>The Generate items button allows you to generate set of item bars.<br/>
                                The Start button will begin the sorting process.
                            </p>
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