import React from 'react'

const NewInventionErrors = ({errors}) => {
  const errorMessages = Object.keys(errors).map((field, i) => {
    return (
      <li key={i}><strong>{field}:</strong> {errors[field]}</li>
    )
  })
  const numErrors = Object.keys(errors).length
  return (
    <div className="alert alert-danger">
      <span className="glyphicon glyphicon-exclamation-sign"></span>
      <span> Your submission resulted in {numErrors} {numErrors > 1 ? 'errors' : 'error'}:</span>
      <ul className='new-invention-errors'>
        {errorMessages}
      </ul>
    </div>
  )
}

export default NewInventionErrors