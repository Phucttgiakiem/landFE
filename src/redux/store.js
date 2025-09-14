import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './slides/counterSlide'

export default configureStore({
  reducer: {
    counter: counterSlice
  }
})