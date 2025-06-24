import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inProgress' | 'done';
}

const initialState: { todos: Todo[]; filter: string } = {
  todos: [],
  filter: 'All',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    addTodo: (state, action: PayloadAction<{ title: string; description: string }>) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        status: 'active',
      });
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.status =
          todo.status === 'active'
            ? 'inProgress'
            : todo.status === 'inProgress'
            ? 'done'
            : 'active';
      }
    },
  },
});

export const { setFilter, addTodo, updateTodo, deleteTodo, toggleTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;