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

  // Get all products
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts()
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
    extraReducers: (builder) => {

      builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kanbans = action.payload
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.kanbans = null
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kanbans = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.kanbans = null
      })
    

    }
})


export const {reset} = productSlice.actions
export default productSlice.reducer