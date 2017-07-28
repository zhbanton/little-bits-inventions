import React from 'react'
import ReactDOM from 'react-dom'

const Invention = (props) => {
  const renderInventionComponentPills = (list, className) => {
    const pills = list.map(cpt => {
      return (
        <span
          key={cpt.id}
          className={`invention-component-pill ${className}`}>
          {cpt.name}
        </span>
      )
    })
    return (
      <div className='invention-component-pill-list'>
        {pills}
      </div>
    )
  }

  const { title, description, user_name, email, bits, materials } = props.invention

  return (
    <div className='container'>
      <div className='panel panel-primary'>
        <div className='panel-body'>
          <div className='invention-title'>{title}</div>
          <div className='invention-description'>{description}</div>
          <div className='invention-field'><strong>User:</strong> {user_name}</div>
          <div className='invention-field'><strong>Email:</strong> {email}</div>
          <div className='invention-field'><strong>Bits Used:</strong> {renderInventionComponentPills(bits, 'bit-pill')}</div>
          <div className='invention-field'><strong>Materials Used:</strong> {renderInventionComponentPills(materials, 'material-pill')}</div>
        </div>

      </div>
    </div>
  )
}

export default Invention

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('invention-data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Invention invention={data} />,
    document.body.appendChild(document.createElement('div'))
  )
})