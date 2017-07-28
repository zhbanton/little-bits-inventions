import React from 'react'
import InventionListItem from './InventionListItem'

const InventionList = ({inventions}) => {
  const inventionListItems = inventions.map(invention => {
    return (
      <InventionListItem
        key={invention.id}
        invention={invention} />
    )
  })
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>User Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {inventionListItems}
      </tbody>
    </table>
  )
}

export default InventionList