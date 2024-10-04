import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const InputCode = ({ submit, getCode, sampleCode }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (submit) {
      getCode(textareaRef.current.value)
    }
  }, [submit, getCode])

  useEffect(() => {
    if (sampleCode !== '') {
      textareaRef.current.value = sampleCode
    }
  }, [sampleCode])

  const defaultCode = `
    let tree = new std.SetTree();
    data.Set_Tree_Keys.map(n => tree.insert(n));    
  `

  return (
    <div className='code-write'>
      <textarea 
        ref={textareaRef}
        className='code-write'
        spellCheck='false'
        wrap='off'
        defaultValue={defaultCode}
      />
    </div>
  )
}

InputCode.propTypes = {
  submit: PropTypes.bool,
  getCode: PropTypes.func,
  sampleCode: PropTypes.string
}

InputCode.defaultProps = {
  submit: false,
  getCode: f => f,
  sampleCode: '',
}

export default InputCode