import React from 'react'
import ReactDOM from 'react-dom'
import InventionList from './InventionList'

export default class Inventions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      inventions: []
    }
  }

  componentDidMount() {
    $.get('/inventions').done(response => {
      this.setState({
        inventions: response,
        isLoading: false
      })
    })
  }

  render() {
    return (
      <div className="container">
        { this.state.isLoading ? this.renderLoading() : this.renderInventions() }
      </div>
    )
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    )
  }

  renderInventions() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading"><strong>My Inventions</strong></div>
        <InventionList inventions={this.state.inventions} />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <Inventions />,
    document.body.appendChild(document.createElement('div'))
  )
})