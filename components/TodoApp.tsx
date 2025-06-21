import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInputSection from './TodoInputSection';
import TodoList from './TodoList';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inProgress' | 'done';
}

export default function TodoApp() {
  console.log('TodoApp rendering'); // Debug log
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) setTodos(JSON.parse(savedTodos));
    } catch (error) {
      console.log('Error loading todos:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log('Error saving todos:', error);
    }
  };

  const addTodo = (title: string, description: string) => {
    if (title.trim()) {
      setTodos([
        ...todos,
        { id: Date.now().toString(), title, description, status: 'active' },
      ]);
    }
  };

  const updateTodo = (id: string, newTitle: string, newDescription: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    console.log('Deleting todo with id:', id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status:
                todo.status === 'active'
                  ? 'inProgress'
                  : todo.status === 'inProgress'
                  ? 'done'
                  : 'active',
            }
          : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    return todo.status === filter.toLowerCase();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO APP</Text>
      <TodoInputSection onAddTodo={addTodo} />
      <View style={styles.filterContainer}>
        {['All', 'Active', 'In Progress', 'Done'].map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterButton,
              filter === filterOption && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(filterOption)}
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
        onToggleStatus={toggleTodoStatus}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
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