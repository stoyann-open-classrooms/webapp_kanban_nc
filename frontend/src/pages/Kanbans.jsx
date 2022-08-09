import React from 'react'
import KanbanActions from '../Components/Kanbans/KanbanActions'
import KanbansList from '../Components/Kanbans/KanbansList'

function Kanbans() {
  return (
    <>
      <h1 className="page-title">Kanbans</h1>
      <KanbanActions />
      <KanbansList/>
    </>
  )
}

export default Kanbans
