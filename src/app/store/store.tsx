import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './reducers';

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
  devTools: true,
});
