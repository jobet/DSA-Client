import React from 'react';
import Size from './sorting-navbar/size';
import Speed from './sorting-navbar/speed';
import noSort from './images/noSort.PNG';
import sortSpeed from './images/sortSpeed.PNG';
import sortBtn from './images/sortBtn.PNG';
import { BiHelpCircle, BiPlayCircle, BiX, BiDice5  } from "react-icons/bi";
class Navbar extends React.Component {  
    state = {
        lengths: [10, 20, 30],
        speeds: [0.50, 0.75, 1.00, 2.00, 4.00, 8.00, 16.00, 32.00, 64.00, 128.00],
        modal: false,
        algoInfoModal: false
    };
    render() {
        return (
            <div className="navbar-sorting">
                <div className="settingArea">
                    <div className="settingLabel">
                        <h1>No. of Items</h1>
                    </div>
                    <div className="settingSelect">
                        <Size 
                            onChange={this.props.onChange}
                            lengths={this.state.lengths}
                        />
                    </div>
                    <div className="settingLabel">
                        <h1>Sort Speed</h1>
                    </div>
                    <div className="settingSelect">
                        <Speed 
                            onChange={this.props.onChange}
                            speeds={this.state.speeds}
                        />
                    </div>
                </div>
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
            </div>
        );
    }
}

export default Navbar;