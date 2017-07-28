import React from 'react'
import ReactDOM from 'react-dom'
import Select, { AsyncCreatable } from 'react-select'
import NewInventionErrors from './NewInventionErrors'

export default class NewInvention extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      userName: '',
      email: '',
      bits: [],
      materials: [],
      errors: {}
    }
    this.bindFunctions()
  }

  bindFunctions() {
    this.handleChange = this.handleChange.bind(this)
    this.handleBitChange = this.handleBitChange.bind(this)
    this.handleMaterialChange = this.handleMaterialChange.bind(this)
    this.handleMaterialAutocomplete = this.handleMaterialAutocomplete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleBitChange(bits) {
    this.setState({ bits })
  }

  handleMaterialChange(materials) {
    const dups = materials.filter(material => {
      return material.label === materials[materials.length - 1].label
    })
    if (dups.length > 1) {
      materials.pop()
    }
    this.setState({ materials })
  }

  handleMaterialAutocomplete(input, callback) {
    $.get('/materials', {query: input})
    .done(response => {
      const materials = response.map(material => {
        return {value: material.name, label: material.name}
      })
      callback(null, {options: materials, complete: true })
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    $.post('/inventions', {
      invention: this.buildInventionAttributes()
    })
    .done(response => {
      window.location.href = `/inventions/${response.id}`
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      this.setState({
        errors: JSON.parse(jqXHR.responseText)
      })
    })
  }

  buildInventionAttributes() {
    return {
      title: this.state.title,
      description: this.state.description,
      user_name: this.state.userName,
      email: this.state.email,
      invention_bits_attributes: this.buildInventionBitsAttributes(),
      invention_materials_attributes: this.buildInventionMaterialsAttributes()
    }
  }

  buildInventionBitsAttributes() {
    const attributes = {}
    this.state.bits.forEach((bit, i) => {
      attributes[i] = { bit_id: bit.value }
    })
    return attributes
  }

  buildInventionMaterialsAttributes() {
    const attributes = {}
    this.state.materials.forEach((material, i) => {
      attributes[i] = {
        material_attributes: {
          name: material.label
        }
      }
    })
    return attributes
  }

  render() {
    return (
      <div>
        <h2>New Invention</h2>
        {Object.keys(this.state.errors).length > 0 && this.renderErrors()}
        {this.renderForm()}
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          name='title'
          value={this.state.title}
          placeholder='title'
          onChange={this.handleChange} />

        <input
          name='description'
          value={this.state.description}
          placeholder='description'
          onChange={this.handleChange} />

        <input
          name='userName'
          value={this.state.userName}
          placeholder='user name'
          onChange={this.handleChange} />

        <input
          name='email'
          value={this.state.email}
          placeholder='email'
          onChange={this.handleChange} />

        <Select
          name='bits'
          placeholder='bits'
          value={this.state.bits}
          multi={true}
          options={this.props.bits.map(bit => {
            return {value: bit.id, label: bit.name}
          })}
          onChange={this.handleBitChange}
        />

        <AsyncCreatable
          name='materials'
          placeholder='materials'
          value={this.state.materials}
          multi={true}
          loadOptions={this.handleMaterialAutocomplete}
          shouldKeyDownEventCreateNewOption={(event) => {
            return event.keyCode === 32 || event.keyCode === 188
          }}
          promptTextCreator={(label) => `${label}`}
          isValidNewOption={(event) => {
            return event.label && event.label.trim().length > 0
          }}
          isOptionUnique={(options) => {
            return true
          }}
          noResultsText={false}
          onChange={this.handleMaterialChange} />

        <input type='submit' />

      </form>
    )
  }

  renderErrors() {
    return (
      <NewInventionErrors errors={this.state.errors} />
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('bits-data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <NewInvention bits={data} />,
    document.body.appendChild(document.createElement('div'))
  )
})