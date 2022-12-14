import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getKanbans, reset } from '../../features/kanbans/kanbanSlice'
import Spinner from '../shared/Spinner'
import KanbanItem from './KanbanItem'

function KanbansList() {
  const { kanbans, isLoading, isError, isSuccess } = useSelector(
    (state) => state.kanban,
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
    dispatch(getKanbans())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="list-container">
        {kanbans.data
          ? kanbans.data.map((kanban) => (
              <KanbanItem key={kanban._id} kanban={kanban} />
            ))
          : <Spinner/>}
      </div>
    )
  }
}

export default KanbansList
