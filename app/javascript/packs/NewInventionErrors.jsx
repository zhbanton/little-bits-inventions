import React from 'react'

const NewInventionErrors = ({errors}) => {
  const errorMessages = Object.keys(errors).map((field, i) => {
    return (
      <li key={i}><strong>{field}:</strong> {errors[field]}</li>
    )
  })
  const numErrors = Object.keys(errors).length
  return (
    <div>
      <div>Your submission resulted in {numErrors} {numErrors > 1 ? 'errors' : 'error'}:</div>
      <ul>
        {errorMessages}
      </ul>
    </div>
  )
}

export default NewInventionErrors