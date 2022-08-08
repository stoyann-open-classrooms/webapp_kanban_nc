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

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {}
})


export const {reset} = orderSlice.actions
export default orderSlice.reducer