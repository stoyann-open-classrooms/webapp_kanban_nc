import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests, reset } from '../../features/requests/requestSlice'
import Spinner from '../shared/Spinner'
import RequestsItem from './RequestsItem'

function RequestsList() {
    const { requests, isLoading, isError, isSuccess } = useSelector(
        (state) => state.request,
      )
      const dispatch = useDispatch()
    
      useEffect(() => {
        return () => {
          if (isSuccess) {
            dispatch(reset)
          }
        }
      }, [dispatch, isSuccess, isError])
    
      useEffect(() => {
        dispatch(getRequests())
      }, [dispatch])

  console.log(requests);
      if (isLoading) {
        return <Spinner />
      } else {
        return (
          <div className="list-container">
            {requests.data
              ? requests.data.map((request) => (
               
                 <RequestsItem key={request._id} request={request}/>
                ))
              : <Spinner/>}
          </div>
        )
      }
}

export default RequestsList