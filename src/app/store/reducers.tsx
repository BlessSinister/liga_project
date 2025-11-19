import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: '@@todos',
  initialState: [{ name: 'Not found' }],
  reducers: {
    getAllTodos: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});
export const { getAllTodos } = todoSlice.actions;
