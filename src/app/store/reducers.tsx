import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: '@@todos',
  initialState: [{ name: 'Not found' }],
  reducers: {
    getAllTodos: (state, action) => {
      return action.payload;
    },
  },
});
export const { getAllTodos } = todoSlice.actions;

export const filterSlice = createSlice({
  name: '@@filter',
  initialState: 'all',
  reducers: {
    setFilter: (_, action) => {
      return action.payload;
    },
  },
});
export const { setFilter } = filterSlice.actions;

export const searchSlice = createSlice({
  name: '@@search',
  initialState: { value: '' },
  reducers: {
    setSearchFilter: (_, action) => {
      return action.payload;
    },
  },
});
export const { setSearchFilter } = searchSlice.actions;
