// src/redux/foldersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const foldersSlice = createSlice({
  name: 'folders',
  initialState: {},
  reducers: {
    addFolder: (state, action) => {
      const { username, boardName, name } = action.payload;
      if (!state[username]) state[username] = {};
      if (!state[username][boardName]) state[username][boardName] = [];
      state[username][boardName].push(name);
    },
    deleteFolder: (state, action) => {
      const { username, boardName, name } = action.payload;
      state[username][boardName] = state[username][boardName].filter((f) => f !== name);
    },
  },
});

export const { addFolder, deleteFolder } = foldersSlice.actions;
export default foldersSlice.reducer;
