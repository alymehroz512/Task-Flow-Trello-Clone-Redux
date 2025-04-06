// src/redux/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    logoutUser: (state) => {
      state.username = null;
    },
  },
});

export const { setUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
