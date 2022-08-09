import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {toast}  from 'react-toastify'
import { createKanban, reset } from '../../features/kanbans/kanbanSlice'
import Spinner from '../shared/Spinner'


function KanbanAddForm() {
  const [kanbanData, setKanbanData] = useState({})
const {  isLoading, isError, isSuccess, message} = useSelector((state) => state.kanban)
const dispatch = useDispatch()

  useEffect(() => {
    if(isError){
        toast.error(message)
    }
    if(isSuccess){
        toast.success('kanban ajouté avec succées')
      dispatch(reset())
    }


    dispatch(reset())
  }, [dispatch, isLoading,isError,isSuccess,message])
 
  const handleInput = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setKanbanData({
      ...kanbanData,
      [name]: value,
    })
  }

 
  

  const onSubmit = (e) => {
    console.log(kanbanData);
    e.preventDefault()
    dispatch(createKanban(kanbanData))
  }
  if(isLoading) {
    return <Spinner/>
  }
  return (
    <form
      className="add_product_form"
      method="POST"
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      <h3 className="title-card">Ajouter un kanban</h3>

      <>
        <div className="input-group">
          <input
            onChange={handleInput}
            type="text"
            name="uid_nfc"
            placeholder="Identifiant kanban"
          />
        </div>
        <div className="input-group">
          <input
            onChange={handleInput}
            type="number"
            name="quantity"
            placeholder="Quantité par kanban"
          />
        </div>
        <div className="input-group">
          <div className="custom-select">
            <select onChange={handleInput} name="produitId" id="">
              <option value="">Choisir un produit</option>
              {/* {products.map((item) => (
                <option
                name="produitId"
                value={item.id}
                key={item.id}
                item={item}
                >
                  {item.refference} <span>{item.designation}</span>
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="form-group">
          <button className="btn-form-submit" type="submit">
            Ajouter
          </button>
        </div>
      </>
    </form>
  )
}

export default KanbanAddForm
