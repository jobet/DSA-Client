import React from 'react'
import PropTypes from 'prop-types'
import StaticList from './staticContainer/StaticList'

const ShowSpecificData = ({specificData={}}) => {
  let Visualize = 'div';
  if (specificData.value.classname === 'List') {
    Visualize = StaticList;
  }
  return (
    <>
      <div className='text-show2'>DataStructure</div>
      <div className='drawing'>
        <Visualize data = {specificData} />
      </div>
    </>
  )
}

ShowSpecificData.propTypes = {
  specificData: PropTypes.object
}

export default ShowSpecificData;