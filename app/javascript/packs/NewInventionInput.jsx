import React from 'react'

const NewInventionInput = (props) => {
  const inputProps = {
    className: 'form-control',
    name: props.name,
    value: props.value,
    placeholder: props.label,
    onChange: props.onChange
  }
  const inputElement = props.textarea ? <textarea {...inputProps} /> : <input {...inputProps} />

  return (
    <div className={`form-group ${props.hasError && 'has-error'}`}>
      <label>{props.label}{props.required && '*'}</label>
      {inputElement}
    </div>
  )
}

export default NewInventionInput