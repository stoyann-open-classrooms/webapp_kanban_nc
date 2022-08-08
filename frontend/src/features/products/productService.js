import axios from 'axios'

const API_URL = 'http://localhost:5058/api/v1/products'

const createProduct = async (kanbanData) => {
  const response = await axios.post(API_URL, kanbanData)
  return response.data
}

const productService = {
  createProduct,
}

export default productService
