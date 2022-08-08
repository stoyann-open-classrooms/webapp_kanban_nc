import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {toast}  from 'react-toastify'
import { createProduct, reset } from '../../../features/products/productSlice'
import Spinner from '../../shared/Spinner'
function ProductAddForm() {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.product,
  )
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const [image, setImage] = useState('')
  const formData = new FormData()
  formData.append('image', image)
  formData.append('designation', product.designation)
  formData.append('refference', product.refference)
 

  const onSubmit = (e) => {
    console.log(product);
    console.log(formData);
     e.preventDefault()
     dispatch(createProduct(product))
   }
  
   const handleInput = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setProduct({
      ...product,
      [name]: value,
    })
  }

  useEffect(() => {
    if(isError){
        toast.error(message)
    }
    if(isSuccess){
        toast.success('Produit ajouté avec succées')
      dispatch(reset())
    }


    dispatch(reset())
  }, [dispatch, isLoading,isError,isSuccess,message])
 





  const handleFile = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  if(isLoading){
    return <Spinner/>
  }
  return (
    <form
      className="add_product_form"
      method="POST"
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      <h2>Ajouter un produit</h2>
      <div className="input-group">
        <label for="product_image" class="custom-file-upload">
          Ajouter une image
        </label>
        <input
          className="input-files"
          onChange={handleFile}
          type="file"
          id="product_image"
          name="image"
          accept="image/png, image/jpeg, image/png"
        />
      </div>
      <div className="input-group">
        <input
          name="designation"
          onChange={handleInput}
          type="text"
          id="product_designation"
          placeholder="Entrer la désignation "
        />
      </div>
      <div className="input-group">
        <input
          name="refference"
          onChange={handleInput}
          type="text"
          placeholder="Enter la refference"
          id="product_refference"
        />
      </div>

      <button className="btn-form-submit" type="submit">
        Ajouter
      </button>
    </form>
  )
}

export default ProductAddForm
