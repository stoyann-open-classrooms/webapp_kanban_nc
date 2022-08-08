import axios from 'axios'

const API_URL = 'http://localhost:5058/api/v1/kanbans'

const createKanban = async (kanbanData) => {
  const response = await axios.post(API_URL, kanbanData)
  return response.data
}
const getKanbans = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const kanbanService = {
  createKanban,
  getKanbans
}

export default kanbanService
