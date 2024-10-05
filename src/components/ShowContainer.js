import React, {Component} from 'react'
import PropTypes from 'prop-types'
import std from './container'

const CodeComp = ({executing, step}) => {
  return (
    <>
    {(step >= 0) ? (step+1).toString()+'. ': null} {executing}
    </>
  )
}

const EmptyComp = () => {
  return (
    <></>
  )
}

let complexCollections = ['PriorityQueue', 'SetTree', 'MapTree', 'MultiSetTree', 'MultiMapTree'];

class ShowContainer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      Visualize: EmptyComp,
      Executing: CodeComp,
      Stop: false,
      isLastStep: false,
      totalSteps: props.methodList.length,
    }
    this.showstep = 0;
  }

  setVisualize = (props) => {
    const objectName = props.containerState.object.classname
    const method = props.containerState.method
    this.params = props.containerState.params
  
    this.setState({
      Visualize: EmptyComp, 
      Executing: EmptyComp, 
      Stop: false, 
      isLastStep: false
    })    
    setTimeout(()=>{
    if (objectName === 'List') {
      switch(method){
        case 'pushBack': 
          this.setState({Visualize: std.List.PushBack, Executing: CodeComp,Stop: false});
          break;
        case 'popBack':
          this.setState({Visualize: std.List.PopBack, Executing: CodeComp,Stop: false});
          break;
        case 'pushFront':
          this.setState({Visualize: std.List.PushFront, Executing: CodeComp,Stop: false});
          break;
        case 'popFront':
          this.setState({Visualize: std.List.PopFront, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'Stack') {
      switch(method) {
        case 'push':
          this.setState({Visualize: std.Stack.Push, Executing: CodeComp,Stop: false});
          break;
        case 'pop':
          this.setState({Visualize: std.Stack.Pop, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      } 
    } else if (objectName === 'Queue') {
      switch (method) {
        case 'push':
          this.setState({Visualize: std.Queue.Push, Executing: CodeComp,Stop: false});
          break;
        case 'pop':
          this.setState({Visualize: std.Queue.Pop, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'PriorityQueue') {
      switch (method) {
        case 'push':
          this.setState({Visualize: std.PriorityQueue.Push, Executing: CodeComp,Stop: false});
          break;
        case 'pop':
          this.setState({Visualize: std.PriorityQueue.Pop, Executing: CodeComp, Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'SetTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'MapTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'MultiSetTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } else if (objectName === 'MultiMapTree') {
      switch (method) {
        case 'insert':
          this.setState({Visualize: std.RedBlackTree.Insert, Executing: CodeComp,Stop: false});
          break;
        default:
          this.setState({Visualize: EmptyComp, Executing: CodeComp,Stop: false});
      }
    } 
    }, 10)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Check if we're on the last step
    const isLastStep = nextProps.step === this.state.totalSteps - 1;
    // Update isLastStep state
    if (isLastStep !== this.state.isLastStep) {
      this.setState({ isLastStep });
    }
    // Don't clear visualization if it's the last step
    if (!isLastStep) {
      if (this.props.duration !== nextProps.duration && complexCollections.indexOf(nextProps.containerState.object.classname) === -1) {
        console.log('call duration change')
        clearTimeout(this.sto1)
        clearTimeout(this.sto2)
      }
    }
    // duration change, clear initiate call
    if (this.props.duration !== nextProps && complexCollections.indexOf(nextProps.containerState.object.classname) === -1) {
      console.log('call duration change')
      clearTimeout(this.sto1)
      clearTimeout(this.sto2)
    }


    // if state change, return true;
    if (this.state !== nextState) {
      console.log('state change')
      return true;
    }
    
    // stopShow: true->false, do rendering
    /*if (this.props.stopShow && nextProps.stopShow) {
      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      this.setVisualize(nextProps)
      return true;
    }*/

    // if next stopShow is true, clear timeout and change Visualize to NextComp
    /*if (this.props.stopShow && nextProps.stopShow) {
      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      console.log('clear timeout, stopShow true');
      this.setState({Stop: true})
      return false;
    }*/

    // if submitTimeout is different and not first method, clear timeout 
    if (this.props.submitStack !== nextProps.submitStack) {
      if (!this.props.submitStack) {
        console.log(this.props.submitStack, "what is this?")
        clearTimeout(this.sto1);
        clearTimeout(this.sto2);
        this.setVisualize(nextProps)
        return false;
      }

      clearTimeout(this.sto1);
      clearTimeout(this.sto2);
      this.setState({Stop: true});
      this.sto2 = setTimeout(() => {
        clearTimeout(this.sto1);
        clearTimeout(this.sto2);
        this.setState({Visualize: EmptyComp, Executing: EmptyComp, Stop: false})
      }, 10);

      if (!nextProps.step) {
        clearTimeout(this.stoNewSubmit)
        this.stoNewSubmit = setTimeout(() => {
          clearTimeout(this.sto1);
          clearTimeout(this.sto2);
          console.log('here');
          this.setVisualize(nextProps)
        },500)
      }
      return false;
    }

    // show animation sequentially
    if (this.props.step + 1 === nextProps.step) { 
      console.log("visualizing next props:", nextProps.step)
      this.setVisualize(nextProps)
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.showstep += 1;
  }

  
  initiate = (time) => {
    const submitStack = this.props.submitStack;
    this.sto1 = setTimeout(() => {
      if (!this.state.isLastStep) {
        this.setState({Visualize: EmptyComp, Executing: EmptyComp, Stop: false})
      }
      this.sto2 = setTimeout(() => this.props.nextStep(submitStack), 10)
    }, time)
  }

  render() {
    return (
      <>
      <div className='drawing'>
        <this.state.Visualize 
        duration={Number(this.props.duration)/100} 
        stop={this.state.Stop} 
        initiate={this.initiate} 
        object={this.props.containerState.object} 
        params = {this.params}
        />
      </div>
      <p className="codeText">
        <this.state.Executing executing = {this.props.executingCode} step={this.props.step}/>
      </p>
      <div className='slidercontainer'> 
        <div className="sliderlabel">
          <p>Speed</p>
          <p>{((Math.round(((260-Number(this.props.duration))/40)*100)/100)-2).toFixed(2)}x</p>
        </div>
        <input 
          type='range' 
          min={120} 
          max={240} 
          value={260 - Number(this.props.duration)} 
          onChange={e => this.props.changeDuration((260 - e.target.value))} 
          className='slider' 
        />
       
      </div>
    </>
    )
  }
}

ShowContainer.propTypes = {
  stopShow: PropTypes.bool,
  step: PropTypes.number,
  submitStack: PropTypes.number,
  nextStep: PropTypes.func,
  containerState: PropTypes.object,
  executingCode: PropTypes.string,
  duration: PropTypes.number,
  changeDuration: PropTypes.func,
  methodList: PropTypes.array,
}

ShowContainer.defaultProps = {
  step: 0,
  submitStack: 0,
  nextStep: f=>f,
  containerState: {},
  executingCode: '',
  changeDuration: f=>f,
}

export default ShowContainer