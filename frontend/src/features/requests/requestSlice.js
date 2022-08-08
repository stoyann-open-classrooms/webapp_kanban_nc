import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import requestService from './requestService'

const initialState = {
    requests: [],
    request: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {}
})


export const {reset} = requestSlice.actions
export default requestSlice.reducer