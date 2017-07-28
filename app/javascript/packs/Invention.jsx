import React from 'react'
import ReactDOM from 'react-dom'

const Invention = (props) => {
  const { title, description, user_name, email, bits, materials } = props.invention
  return (
    <div>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <div>User: {user_name}</div>
      <div>Email: {email}</div>
      <div>Bits: {bits.map(bit => bit.name).join(', ')}</div>
      <div>Materials: {materials.map(material => material.name).join(', ')}</div>
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