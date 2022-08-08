import React from 'react'
import Dialog from '../../shared/Dialog/Dialog'
import SearchBar from '../../shared/SearchBar/SearchBar'
import KanbanAddForm from '../KanbanAddForm/KanbanAddForm'
import './KanbanActions.css'
function KanbanActions() {
  return (
    <>
   
    <div className="actions">
        <div className="actions-infos">5 produits en base de données</div>
      <div className="dialog-box">
        <Dialog>
          <KanbanAddForm />
        </Dialog>
      </div>
    </div>
    <div className="search">
        <div className="input-group">
        <SearchBar placeholder={"rechercher par désignation ou refference"}>
        </SearchBar>
        </div>
        </div>
    </>
  )
}

export default KanbanActions
