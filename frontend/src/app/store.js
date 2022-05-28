import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import categoryReducer from '../features/category/CategorySlice'
import taskReducer from '../features/task/TaskSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    task: taskReducer,
  },
})
