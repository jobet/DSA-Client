import React from 'react'
import PropTypes from 'prop-types'
import { BiShow } from 'react-icons/bi'

// component for displaying the method list for the data structure visualizer
class ShowMethodList extends React.Component {
  constructor(goMethod=f=>f, methodList=[], changeStop = f=>f, stopShow=false) {
    super()
    this.state = {
      showmethod: false,
    }
  }

  changeShowMethod = (did = true) => {
    if (this.props.methodList.length){
      this.setState({showmethod: !this.state.showmethod})
    }
  }

  gotoMethod = (idx) => {
    this.setState({showmethod: !this.state.showmethod})
    this.props.changeStopShowToTrue();
    this.props.goMethod(idx);
  }

  methodScript = (method, idx) => {
    return (
      <>
        <button onClick={()=>this.gotoMethod(idx)}>{idx+1}. {method.executingCode.substring(0, 40)}</button>
      </>
    )
  }

  render() {
    return (
      <div className="dropdown-container">
      <button className='showmethodbutton' onClick={() => this.changeShowMethod(false)}>
        <BiShow /> Show Method
      </button>
      {this.state.showmethod && (
      <>
      <div onClick={this.changeShowMethod} className="overlay2"></div>
        <div className='appDropdown'>
            {this.props.methodList.map((n, i) => this.methodScript(n, i))}
        </div>
      </>
       )}
    </div>
    )
  }
}

ShowMethodList.propTypes = {
  goMethod: PropTypes.func,
  methodList: PropTypes.array,
  changeStop: PropTypes.func,
  changeStopShowToTrue: PropTypes.func,
}

export default ShowMethodList;