import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    register: (state, action) => {
      
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log(state)
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;