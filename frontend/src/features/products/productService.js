import axios from 'axios'

const API_URL = 'http://localhost:5058/api/v1/products'

const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData)
  return response.data
}
const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
const productService = {
  createProduct,
  getProducts
}

export default productService
