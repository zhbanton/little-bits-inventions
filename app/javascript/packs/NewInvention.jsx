import React from 'react'
import ReactDOM from 'react-dom'
import Select, { AsyncCreatable } from 'react-select'

import NewInventionInput from './NewInventionInput'
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
      <div className='container'>
        <div className="panel panel-primary">
          <div className="panel-heading"><strong>Create New Invention</strong></div>
          <div className='panel-body'>
            {Object.keys(this.state.errors).length > 0 && this.renderErrors()}
            {this.renderForm()}
          </div>
        </div>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit} >
        <NewInventionInput
          required
          label='Title'
          name='title'
          value={this.state.title}
          hasError={!!this.state.errors.title}
          onChange={this.handleChange} />

        <NewInventionInput
          required
          textarea
          label='Description'
          name='description'
          value={this.state.description}
          hasError={!!this.state.errors.description}
          onChange={this.handleChange} />

        <div className={`form-group ${this.state.errors.invention_bits && 'has-error'}`}>
          <label>Bits Used* (must add at least one bit)</label>
          <Select
            name='bits'
            placeholder='Bits'
            value={this.state.bits}
            multi={true}
            options={this.props.bits.map(bit => {
              return {value: bit.id, label: bit.name}
            })}
            onChange={this.handleBitChange} />
        </div>

        <div className='form-group'>
          <label>Materials Used</label>
          <AsyncCreatable
            name='materials'
            placeholder='Materials'
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
        </div>

        <NewInventionInput
          label='User Name'
          name='userName'
          value={this.state.userName}
          hasError={!!this.state.errors.user_name}
          onChange={this.handleChange} />

        <NewInventionInput
          label='Email'
          name='email'
          value={this.state.email}
          hasError={!!this.state.errors.email}
          onChange={this.handleChange} />

        <input className='btn btn-secondary' type='submit' />

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