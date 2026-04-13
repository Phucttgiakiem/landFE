import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './slides/counterSlide'
import userReducer from './slides/userSlide'
import listingReducer from './slides/ListingSlide'
import homeReducer from './slides/HomeSlide'  
export default configureStore({
  reducer: {
    counter: counterSlice,
    user: userReducer,
    listing: listingReducer,
    home: homeReducer
  },
})