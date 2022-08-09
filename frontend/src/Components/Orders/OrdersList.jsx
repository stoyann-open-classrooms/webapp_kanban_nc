import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, reset } from '../../features/orders/orderSlice'

import Spinner from '../shared/Spinner'
import OrdersItem from './OrdersItem'

function OrdersList() {
    const { orders, isLoading, isError, isSuccess } = useSelector(
        (state) => state.order,
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
        dispatch(getOrders())
      }, [dispatch])

      console.log(orders)
      if (isLoading) {
        return <Spinner />
      } else {
        return (
          <div className="list-container">
            {orders.data
              ? orders.data.map((order) => (
                <OrdersItem key={order._id} order={order}  />
              
                ))
              : <Spinner/>}
          </div>
        )
      }
}

export default OrdersList