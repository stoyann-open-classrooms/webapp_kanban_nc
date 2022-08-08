import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


// Create new product
export const createProduct = createAsyncThunk(
    'products/create',
    async (productData, thunkAPI) => {
      try {
        return await productService.createProduct(productData)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    },
  )
  

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {}
})


export const {reset} = productSlice.actions
export default productSlice.reducer