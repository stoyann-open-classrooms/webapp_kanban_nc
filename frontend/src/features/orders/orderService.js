import axios from 'axios'

const API_URL = 'http://localhost:5058/api/v1/orders'

const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData)
  return response.data
}
const getOrders = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
const orderService = {
  createOrder,
  getOrders
}

export default orderService
