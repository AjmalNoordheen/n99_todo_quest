import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  token:null
}

export const baseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   Login:(state,action)=>{
        state.email = action.payload.email
        state.token = action.payload.token
   },
   Logout:(state)=>{
    state.email = ''
    state.token = ''
   }
  },
})

// Action creators are generated for each case reducer function
export const {Login,Logout} = baseSlice.actions

export default baseSlice.reducer