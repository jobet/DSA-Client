import React from 'react'
import PropTypes from 'prop-types'

//Component for displaying the data list for the data structure visualizer
class ShowDataList extends React.Component {
  constructor({dataStates=[], changeStop= f=>f, stopShow=false}) {
    super()
    this.state = {
      showdata: false,
      showstring: false,
      string: null,
    }
  }

  changeShowdata = (did = true) => {
    if (did || !this.props.stopShow) {
      this.props.changeStop();
    }
    this.setState({showdata:!this.state.showdata});
  }

  changeShowString = (string = null) => {
    this.setState({showstring: !this.state.showstring, string: string});
  }

  consolelog = (value) => {
    console.log(value)
  }

  viewContainer = (data = null) => {
    this.changeShowdata();
    this.props.showSpecificData(data);
  }

  dataScript = (data) => {
    return (
      <div className='datascript'>
        <div className='dataname'>Name: {data.name.substring(0,20)}</div>
        {/* <button className='consolelog' onClick={() => console.log(data.value)}>Log</button>         */}
        <button className='toString' onClick={() => this.changeShowString(data.value.toString())}>Show</button>   
        {(data.value.classname === 'List')?
        <button className='viewobject' onClick={() => this.viewContainer(data)}>View</button>   
        :null}
      </div>
    )
  }

  render() {
    return (
      <div className='showdata'>
        {/*<button className='showdatabutton' onClick={() => this.changeShowdata(false)}>Show Data</button>*/}
        {(this.state.showdata)?
        <div className='coverDom2'>
          <div className='dataContent'>
            {this.props.dataStates.map(data=>this.dataScript(data))}
            <button className='closeshowdata' onClick={this.changeShowdata}>CLOSE</button>
          </div>
        </div>
        :null}
        {(this.state.showstring)?
        <div className='dataContent'>
          <div className='datastring'>
          {this.state.string.split('\n').map(n => <div>{'+'+n}<br /></div>)}
          </div>
          <button className='closeshowdata' onClick={this.changeShowString}>CLOSE</button>
        </div>
        :null}
      </div>
    )
  }
}

ShowDataList.propTypes = {
  dataStates: PropTypes.array,
  changeStop: PropTypes.func,
  showSpecificData: PropTypes.func,
}

export default ShowDataList;