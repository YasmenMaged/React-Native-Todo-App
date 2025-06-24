import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TodoInputSection from './TodoInputSection';
import TodoList from './TodoList';
import { setFilter, addTodo, updateTodo, deleteTodo, toggleTodoStatus } from '../store/todoSlice';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inProgress' | 'done';
}

export default function TodoApp() {
  console.log('TodoApp rendering');
  const dispatch = useDispatch();
  const todos = useSelector((state: { todos: Todo[] }) => state.todos);
  const filter = useSelector((state: { filter: string }) => state.filter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    return todo.status === filter.toLowerCase();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO APP</Text>
      <TodoInputSection onAddTodo={(title, description) => dispatch(addTodo({ title, description }))} />
      <View style={styles.filterContainer}>
        {['All', 'Active', 'In Progress', 'Done'].map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterButton,
              filter === filterOption && styles.filterButtonActive,
            ]}
            onPress={() => dispatch(setFilter(filterOption))}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterOption && styles.filterTextActive,
              ]}
            >
              {filterOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.divider} />
      <TodoList
        todos={filteredTodos}
        onToggleStatus={(id) => dispatch(toggleTodoStatus(id))}
        onUpdateTodo={(id, newTitle, newDescription) => dispatch(updateTodo({ id, title: newTitle, description: newDescription }))}
        onDeleteTodo={(id) => dispatch(deleteTodo(id))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0f0',
    alignItems: 'center',
  },
  filterButtonActive: { backgroundColor: '#6200EE' },
  filterText: { color: '#333', fontWeight: '500' },
  filterTextActive: { color: 'white' },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 20 },
});