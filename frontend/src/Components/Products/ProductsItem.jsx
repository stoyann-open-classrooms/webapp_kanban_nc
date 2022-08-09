import { Link } from 'react-router-dom'
import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from '../shared/Card/Card'
import NoPics from '../../Assets/no_picture.png'

function ProductsItem({ product }) {
   
    const deleteItem = (id) => {
 
        if(window.confirm('êtes vous certains de vouloir supprimer ce kanban? Cette action supprimera toutes les commandes liée au kanban.')) {
     
         setTimeout(() => window.location.reload(), 2000)
     
       }}

  return (

    <Card>
      {/* <div className="card-cover">
        {!product.image ? (
          <img className="card-cover-img" src={NoPics} alt="" />
        ) : (
          <img
            className="card-cover-img"
            src={'http://localhost:5057/' + product.image}
            alt={product.designation}
          />
        )}
      </div> */}

      <div className="card-info">
        <div>
          <h3 className="card-title"> kanban : {product.designation}</h3>
        </div>
      </div>

      <button onClick={() => deleteItem(product._id)} className="close">
        <FaTimes color="red" />
      </button>
      <Link to={`/kanban/${product._id}`}>
        {/* TODO = formulaire d'edition d'un produit */}
        <button className="edit">
          <FaEdit color="red" />
        </button>
      </Link>
    </Card>
  )
}

export default ProductsItem
