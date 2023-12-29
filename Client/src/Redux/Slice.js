import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  id:null
}

export const baseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   Login:(state,action)=>{
        state.email = action.payload.email,
        state.id = action.payload.id
   }
  },
})

// Action creators are generated for each case reducer function
export const {Login} = baseSlice.actions

export default baseSlice.reducer