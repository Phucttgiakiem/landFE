import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './slides/counterSlide'
import userReducer from './slides/userSlide'

export default configureStore({
  reducer: {
    counter: counterSlice,
    user: userReducer
  },
})