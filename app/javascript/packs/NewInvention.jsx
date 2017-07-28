import React from 'react'
import ReactDOM from 'react-dom'
import Select, { Creatable } from 'react-select'

export default class NewInvention extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      userName: '',
      email: '',
      bits: [],
      materials: []
    }
    this.bindFunctions()
  }

  bindFunctions() {
    this.handleChange = this.handleChange.bind(this)
    this.handleBitChange = this.handleBitChange.bind(this)
    this.handleMaterialChange = this.handleMaterialChange.bind(this)
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
    this.setState({ materials })
  }

  handleSubmit(e) {
    e.preventDefault()

    $.post('/inventions', {
      invention: this.buildInventionAttributes()
    }).done(response => {
      window.location.href = `/inventions/${response.id}`
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

          <Creatable
            name='materials'
            placeholder='materials'
            value={this.state.materials}
            multi={true}
            options={[]}
            shouldKeyDownEventCreateNewOption={(event) => {
              return event.keyCode === 32 || event.keyCode === 188
            }}
            promptTextCreator={(label) => `${label} `}
            isValidNewOption={(event) => {
              return event.label && event.label.trim().length > 0
            }}
            onInputKeyDown={(event) => {
              switch (event.keyCode) {
                case 13:
                  event.preventDefault()
                  break
              }
            }}
            noResultsText={false}
            onChange={this.handleMaterialChange} />

          <input type='submit' />

        </form>
      </div>
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