import React, { Component } from 'react';
import ShowSection from '../ShowSection';
import sampleDatas from '../../data/testDatas';
import parsing from '../../data/parsing';

class Dsa extends Component {
  constructor() {
    super();
    this.sampleDatas = sampleDatas;
    this.state = {
      dataStates: [],
      executingCode: '',
      containerState: { object: '', method: '', params: [] },
      step: -1,
      code: '',
      data: {},
      submitStack: 0,
      stopShow: false,
      duration: 140,
      methodAnimation: true,
      specificData: {},
    };
  }

  getCode = (code) => {
    this.setState({
      dataStates: [],
      executingCode: '',
      containerState: { object: '', method: '', params: [] },
      code,
      step: -1,
      submitStack: this.state.submitStack + 1,
      methodAnimation: true,
    });
  }

  getData = (data) => {
    this.setState({
      dataStates: [],
      executingCode: '',
      containerState: { object: '', method: '', params: [] },
      data,
      step: -1,
      submitStack: this.state.submitStack + 1,
      methodAnimation: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.submitStack !== nextState.submitStack) {
      this.sampleDatas = parsing({ inputCode: nextState.code, inputData: nextState.data });
      this.nextStep(nextState.submitStack, nextState);
      return false;
    }
    return true;
  }

  nextStep = (submitStack, state = this.state) => {
    const nextstep = state.step + 1;
    const lastvalue = this.sampleDatas.length;
      
    if (submitStack === state.submitStack && nextstep < lastvalue) {
      this.setState({
        dataStates: this.sampleDatas[nextstep].dataStates,
        executingCode: this.sampleDatas[nextstep].executingCode,
        containerState: this.sampleDatas[nextstep].containerState,
        step: nextstep,
        methodAnimation: true,
      });
    } else if (submitStack === state.submitStack && nextstep === lastvalue) {
      console.log("last step reached")
      this.setState({
        stopShow: false,
        methodAnimation: true,
      });
    }
  }

  changeStop = () => {
    console.log("changeStop reached")
    this.setState(prevState => ({
      stopShow: !prevState.stopShow,
      methodAnimation: true,
    }));
  }

  changeStopShowToTrue = () => {
    console.log("changeStopShowToTrue reached")
    this.setState({stopShow: true});
  }

  changeStopShowToFalse = () => {
    console.log("changeStopShowToFalse reached")
    this.setState({stopShow: false});
  }

  goMethod = (idx) => {
    console.log("goMethod reached")
    this.setState({
      stopShow: false,
      dataStates: this.sampleDatas[idx].dataStates,
      executingCode: this.sampleDatas[idx].executingCode,
      containerState: this.sampleDatas[idx].containerState,
      step: idx,
      methodAnimation: true,
    });
  }

  changeDuration = (value) => {
    this.setState({
      duration: value,
      methodAnimation: true,
    });
  }

  showSpecificData = (data) => {
    this.setState({ specificData: data, methodAnimation: false });
  }

  render() {
    return (
      <ShowSection 
        getCode={this.getCode}
        getData={this.getData}
        specificData={this.state.specificData}
        showSpecificData={this.showSpecificData}
        methodAnimation={this.state.methodAnimation}
        goMethod={this.goMethod}
        methodList={this.sampleDatas.filter(n => n.executingCode)}
        duration={this.state.duration}
        changeDuration={this.changeDuration}
        changeStop={this.changeStop}
        stopShow={this.state.stopShow}
        step={this.state.step}
        submitStack={this.state.submitStack}
        nextStep={this.nextStep}
        dataStates={this.state.dataStates}
        executingCode={this.state.executingCode}
        containerState={this.state.containerState}
        changeStopShowToTrue={this.changeStopShowToTrue}
        changeStopShowToFalse={this.changeStopShowToFalse}
      />
    );
  }
}

export default Dsa;