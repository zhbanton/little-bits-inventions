import React from 'react'
import ReactDOM from 'react-dom'

export default class Inventions extends React.Component {
  render() {
    return <h1>hello!</h1>
  }
}

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <Inventions />,
    document.body.appendChild(document.createElement('div'))
  )
})