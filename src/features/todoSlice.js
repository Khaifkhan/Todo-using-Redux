import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    value: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.value.push({
        id: Math.trunc(Math.random() * 10000000),
        text: action.payload.text,
      });
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const editTodoItem = state.value.find((e) => e.id === id);
      if (editTodoItem) {
        editTodoItem.text = text;
      }
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
