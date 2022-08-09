import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, reset } from '../../features/products/productSlice'

import Spinner from '../shared/Spinner'
import ProductsItem from './ProductsItem'

function ProductsList() {
    const { products, isLoading, isError, isSuccess } = useSelector(
        (state) => state.product,
      )
      const dispatch = useDispatch()
    
      useEffect(() => {
        return () => {
          if (isSuccess) {
            dispatch(reset())
          }
        }
      }, [dispatch, isSuccess, isError])
    
      useEffect(() => {
        dispatch(getProducts())
      }, [dispatch])

      console.log(products)
      if (isLoading) {
        return <Spinner />
      } else {
        return (
          <div className="list-container">
            {products.data
              ? products.data.map((product) => (
               
                 <ProductsItem key={product._id} product={product}/>
                ))
              : <Spinner/>}
          </div>
        )
      }
}

export default ProductsList