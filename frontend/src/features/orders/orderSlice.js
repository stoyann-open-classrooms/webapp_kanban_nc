import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    orders: [],
    order: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


// Create new product
export const createOrder = createAsyncThunk(
    'orders/create',
    async (orderData, thunkAPI) => {
      try {
        return await orderService.createProduct(orderData)
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
export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrders()
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
  

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {

      builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.orders = null
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.orders = null
      })
    

    }
})


export const {reset} = orderSlice.actions
export default orderSlice.reducer