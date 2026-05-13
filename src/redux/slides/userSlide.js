import { createSlice } from '@reduxjs/toolkit'

export const userSlide = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    access_Token: '',
    idNumber: '',
    
  },
  reducers: {
    updateUser: (state,action) => {
      const {_id,fullname,email,password,phone,address,role,access_Token,idNumber} = action.payload;
      state.id = _id
      state.name = fullname;
      state.email = email;
      state.password = password;
      state.phone = phone;
      state.address = address;
      state.role = role;
      state.access_Token = access_Token;
      state.idNumber = idNumber;
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.access_Token = '';
      state.phone = '';
      state.address = '';
      state.role = '';
      state.password = '';
      state.idNumber = '';
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer