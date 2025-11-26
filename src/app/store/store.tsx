import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { tasksApi } from '../../api/tasksApi';
import { filterSlice, searchSlice, todoSlice } from './reducers';

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    filter: filterSlice.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    search: searchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
