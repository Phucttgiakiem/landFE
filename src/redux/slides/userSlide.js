import { createSlice } from '@reduxjs/toolkit'

export const userSlide = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    access_Token: ''
  },
  reducers: {
    updateUser: (state,action) => {
      const {fullname,email,access_Token} = action.payload;
      state.name = fullname || email;
      state.email = email;
      state.access_Token = access_Token;
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.access_Token = '';
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer