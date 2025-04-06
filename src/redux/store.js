// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import boardsReducer from './boardsSlice';
import foldersReducer from './foldersSlice';
import tasksReducer from './tasksSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Named import

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  folders: foldersReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }).concat(thunk),
});

export const persistor = persistStore(store);
