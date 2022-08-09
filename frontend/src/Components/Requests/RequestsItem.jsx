import React from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Card from '../shared/Card/Card'
import Dialog from '../shared/Dialog/Dialog'

function RequestsItem({ request }) {
  const deleteItem = (id) => {
    if (
      window.confirm(
        'êtes vous certains de vouloir supprimer ce kanban? Cette action supprimera toutes les commandes liée au kanban.',
      )
    ) {
      setTimeout(() => window.location.reload(), 2000)
    }
  }
  return (
    <Card>
      <div className="card-cover">
        {/* {!request.kanban.produitId ? (
          <img  className='card-cover-img' src={NoPics} alt="" />
        ) : (
          <img 
          className='card-cover-img'
            src={'http://localhost:9000/' + request.kanban.produit.image}
            alt={request.designation}
          />
        )} */}
      </div>
      <div className="card-info-request">
        <h3 className="title-card-kanban">kanban : {request.kanban.uid_nfc}</h3>
        <h3>Date demande</h3>
        <p>{new Date(request.createdAt).toLocaleDateString()}</p>

        <div className="box">
          <Dialog btn={'traiter'}></Dialog>
        </div>
      </div>

      <button onClick={() => deleteItem(request.id)} className="close">
        <FaTimes color="red" />
      </button>
      <Link to={`/kanban/${request.kanban.id}`}>
        {/* TODO = formulaire d'edition d'un produit */}
        <button className="edit">
          <FaEdit color="red" />
        </button>
      </Link>
    </Card>
  )
}

export default RequestsItem
