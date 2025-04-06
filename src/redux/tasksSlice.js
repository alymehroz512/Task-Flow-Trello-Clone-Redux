// src/redux/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
    addTask: (state, action) => {
      const { username, boardName, folderName, task } = action.payload;
      if (!state[username]) state[username] = {};
      if (!state[username][boardName]) state[username][boardName] = {};
      if (!state[username][boardName][folderName]) state[username][boardName][folderName] = [];
      state[username][boardName][folderName].push({
        ...task,
        status: '', // default status is empty
      });
    },
    deleteTask: (state, action) => {
      const { username, boardName, folderName, index } = action.payload;
      state[username][boardName][folderName].splice(index, 1);
    },
    updateTaskStatus: (state, action) => {
      const { username, boardName, folderName, index, status } = action.payload;
      const task = state[username][boardName][folderName][index];
      if (task) {
        task.status = status;
      }
    },
  },
});

export const { addTask, deleteTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
