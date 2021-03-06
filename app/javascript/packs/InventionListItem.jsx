import React from 'react'

const InventionListItem = ({invention}) => {
  return (
    <tr>
      <td><a href={`/inventions/${invention.id}`}>{invention.title}</a></td>
      <td>{invention.description}</td>
      <td>{invention.user_name}</td>
      <td>{invention.email}</td>
    </tr>
  )
}

export default InventionListItem