import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import kanbanService from './kanbanService'

const initialState = {
    kanbans: [],
    kanban: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new kanban
export const createKanban = createAsyncThunk(
    'kanbans/create',
    async (kanbanData, thunkAPI) => {
      try {
        return await kanbanService.createKanban(kanbanData)
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
// Get kanbans
export const getKanbans = createAsyncThunk(
    'kanbans/getAll',
    async (_, thunkAPI) => {
      try {
        return await kanbanService.getKanbans()
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

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createKanban.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createKanban.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.kanbans = action.payload
        })
        .addCase(createKanban.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.kanbans = null
        })
        .addCase(getKanbans.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getKanbans.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.kanbans = action.payload
        })
        .addCase(getKanbans.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.kanbans = null
        })
      
    }
})


export const {reset} = kanbanSlice.actions
export default kanbanSlice.reducer