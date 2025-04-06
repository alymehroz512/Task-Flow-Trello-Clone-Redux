// src/redux/boardsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {},
  reducers: {
    addBoard: (state, action) => {
      const { username, name } = action.payload;
      if (!state[username]) state[username] = [];
      state[username].push(name);
    },
    deleteBoard: (state, action) => {
      const { username, name } = action.payload;
      state[username] = state[username].filter((b) => b !== name);
    },
  },
});

export const { addBoard, deleteBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
