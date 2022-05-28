import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import categoryService from './CategoryService'

const initialState = {
  categories: [],
  category: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Categories
export const getCategories = createAsyncThunk(
  'category/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await categoryService.getCategories(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create a new category
export const createCategory = createAsyncThunk(
  'category/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await categoryService.createCategory(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update existing category
export const updateCategory = createAsyncThunk(
  'category/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await categoryService.updateCategory(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete existing category
export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await categoryService.deleteCategory(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success(`Category with the name "${action.payload.name}" was created successfully!`);
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success(`Category with the name "${action.payload.name}" was updated successfully!`);
        let foundIndex = state.categories.findIndex(x => x.id == action.payload.id);
        state.categories[foundIndex] = action.payload
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success(`Category was deleted successfully!`);
        state.categories = state.categories.filter(item => item.id !== action.payload.category_id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = categorySlice.actions
export default categorySlice.reducer
