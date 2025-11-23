import { configureStore } from '@reduxjs/toolkit';
import { filterSlice, todoSlice } from './reducers';

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    filter: filterSlice.reducer,
  },
  devTools: true,
});
