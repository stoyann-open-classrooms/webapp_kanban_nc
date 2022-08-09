import axios from 'axios'

const API_URL = 'http://localhost:5058/api/v1/requests'

const createRequest = async (requestData) => {
  const response = await axios.post(API_URL, requestData)
  return response.data
}
const getRequests = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
const requestService = {
  createRequest,
  getRequests
}

export default requestService
