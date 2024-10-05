import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const InputData = ({ submit, getData, sampleData }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (submit) {
      getData(textareaRef.current.value)
    }
  }, [submit, getData])

  useEffect(() => {
    if (sampleData !== '') {
      textareaRef.current.value = sampleData
    }
  }, [sampleData, getData])

  const generateRandomArray = () => {
    const arr = []
    while (arr.length < 5) {
      const r = Math.floor(Math.random() * 100) + 1
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    return arr
  }

  const defaultInputData = `{
  Set_Tree_Keys:[${generateRandomArray()}]
}`

  return (
    <textarea 
      ref={textareaRef}
      className='input-data'
      wrap='off'
      spellCheck='false'
      defaultValue={defaultInputData}
    />
  )
}

InputData.propTypes = {
  submit: PropTypes.bool,
  getData: PropTypes.func,
  sampleData: PropTypes.string
}

InputData.defaultProps = {
  submit: false,
  getData: f => f,
  sampleData: ''
}

export default InputData