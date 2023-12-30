import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
}

export const baseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   Login:(state,action)=>{
        state.email = action.payload.email
   },
   Logout:(state)=>{
    state.email = ''
   }
  },
})

// Action creators are generated for each case reducer function
export const {Login,Logout} = baseSlice.actions

export default baseSlice.reducer