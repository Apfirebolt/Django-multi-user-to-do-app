import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import taskService from './TaskService'

const initialState = {
  tasks: [],
  task: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Tasks
export const getTasks = createAsyncThunk(
  'task/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await taskService.getTasks(token)
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

// Create a new Task
export const createTask = createAsyncThunk(
  'task/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await taskService.createTask(data, token)
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

// Update Existing task
export const updateTask = createAsyncThunk(
  'task/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await taskService.updateTask(data, token)
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

// Delete Existing task
export const deleteTask = createAsyncThunk(
  'task/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await taskService.deleteTask(id, token)
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

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success(`Task with the name "${action.payload.name}" was created successfully!`);
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success(`Task with the name "${action.payload.name}" was updated successfully!`);
        let foundIndex = state.tasks.findIndex(x => x.id === action.payload.id);
        state.tasks[foundIndex] = action.payload
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success(`Task was deleted successfully!`);
        state.tasks = state.tasks.filter(item => item.id !== action.payload.task_id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer
