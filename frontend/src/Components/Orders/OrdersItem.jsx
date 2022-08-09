import { Link } from 'react-router-dom'
import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from '../shared/Card/Card'
import NoPics from '../../Assets/no_picture.png'

function OrdersItem({ order}) {
   
    const deleteItem = (id) => {
 
        if(window.confirm('êtes vous certains de vouloir supprimer ce kanban? Cette action supprimera toutes les commandes liée au kanban.')) {
     
         setTimeout(() => window.location.reload(), 2000)
     
       }}

  return (

    <Card>
      <div className="card-info">
        <div>
          <h3 className="card-title"> Commande : {order.orderNumber}</h3>
          <div> quantité par kanban : {order.quantity}</div>
        </div>
      </div>

      <button onClick={() => deleteItem(order._id)} className="close">
        <FaTimes color="red" />
      </button>
      <Link to={`/kanban/${order._id}`}>
        {/* TODO = formulaire d'edition d'un produit */}
        <button className="edit">
          <FaEdit color="red" />
        </button>
      </Link>
    </Card>
  )
}

export default OrdersItem
