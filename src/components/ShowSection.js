import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowMethodList from './ShowMethodList';
import ShowContainer from './ShowContainer';
import ShowSpecificData from './ShowSpecificData';
import { BiHelpCircle, BiX, BiStop, BiPlayCircle } from 'react-icons/bi';
import InputCode from './InputCode';
import InputData from './InputData';
import SampleCode from './SampleCode';
import dsaType from './images/dsaType.png';
import sortSpeed from './images/sortSpeed.PNG';
import dsaInput from './images/dsaInput.png';
import dsaFunction from './images/dsaFunction.png';

class ShowSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      submit: false,
      sampleCode: '',
      sampleData: '',
    };
  }

  handleSampleChange = (code, data) => {
    this.setState({ sampleCode: code, sampleData: data });
  };

  toggleModal = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  handleActionButton = () => {
    const { stopShow, changeStop, changeStopShowToFalse, changeStopShowToTrue, step, submitStack } = this.props;
    if (stopShow) {
      // If stopped, restart from the current step
      changeStopShowToFalse();
      this.props.nextStep(submitStack, { ...this.props, step: step - 1 });
    } else {
      changeStopShowToTrue();
      // If running, either start or stop
      this.setState({ submit: true }, () => {
        setTimeout(() => {
          this.setState({ submit: false });
        }, 10);
      });
    }
  };

  render() {
    const {
      getCode,
      getData,
      specificData,
      showSpecificData,
      methodAnimation,
      goMethod,
      methodList,
      duration,
      changeDuration,
      stopShow,
      step,
      submitStack,
      nextStep,
      dataStates,
      executingCode,
      containerState,
      changeStopShowToTrue,
    } = this.props;

    const { modal, submit, sampleCode, sampleData } = this.state;

    return (
      <>
        {methodAnimation ? (
          <ShowContainer
            duration={duration}
            changeDuration={changeDuration}
            stopShow={stopShow}
            step={step}
            submitStack={submitStack}
            nextStep={nextStep}
            containerState={containerState}
            executingCode={executingCode}
            methodList={methodList}
          />
        ) : (
          <ShowSpecificData specificData={specificData} />
        )}
        <div className="inputContainer">
          <InputCode submit={submit} getCode={getCode} sampleCode={sampleCode} />
          <InputData submit={submit} getData={getData} sampleData={sampleData} stopShow={stopShow} /> 
        </div>
        <div className="buttonArea">
          <SampleCode changeSample={this.handleSampleChange} stopShow={stopShow} />
        </div>
        <div className="buttonArea">
          <button onClick={this.toggleModal}><BiHelpCircle /> Help</button>
          <ShowMethodList
            stopShow={stopShow}
            goMethod={goMethod}
            methodList={methodList}
            changeStop={this.handleActionButton}
            changeStopShowToTrue={changeStopShowToTrue}
          />
          <button className='action-button' onClick={this.handleActionButton}>
            {stopShow ? (
              <>
                <BiStop /> Stop
              </>
            ) : (
              <>
                <BiPlayCircle /> Start
              </>
            )}
          </button>
        </div>
        {modal && (
          <div className="modal">
            <div onClick={this.toggleModal} className="overlay"></div>
            <div id="modal-instruction" className="modal-content">
              <h1>Data Structures Instructions</h1>
              <div className="modalSeparator">
                <p>Select the data structure algorithm you want to visualize.</p>
                <img src={dsaType} alt="Select Sorting Algorithm"/>
              </div>
              <div className="modalSeparator">
                <p>You can change the duration of the animation by dragging the slider.</p>
                <img src={sortSpeed} alt="Change Speed"/>
              </div>
              <div className="modalSeparator">
                <p>In the input data field, you can input your own data array.</p>
                <p>Sample data values are provided.</p>
                <img src={dsaInput} alt="Input Data"/>
              </div>
              <div className="modalSeparator">
                <p>To start the visualization process, press the Start button.</p>
                <p>Once the visualization has started, you can stop it by pressing the Stop button.</p>
                <p>To visualize a step from the overall process, press the Show Method button.</p>
                <img src={dsaFunction} alt="Show Method and Start Button"/>
              </div>
              <button className="close-modal" onClick={this.toggleModal}>
                <BiX />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

ShowSection.propTypes = {
  getCode: PropTypes.func,
  getData: PropTypes.func,
  specificData: PropTypes.object,
  showSpecificData: PropTypes.func,
  methodAnimation: PropTypes.bool,
  goMethod: PropTypes.func,
  methodList: PropTypes.array,
  duration: PropTypes.number,
  changeDuration: PropTypes.func,
  changeStop: PropTypes.func,
  stopShow: PropTypes.bool,
  step: PropTypes.number,
  submitStack: PropTypes.number,
  nextStep: PropTypes.func,
  dataStates: PropTypes.array,
  executingCode: PropTypes.string,
  containerState: PropTypes.object,
  changeStopShowToTrue: PropTypes.func,
  changeStopShowToFalse: PropTypes.func,
};

export default ShowSection;