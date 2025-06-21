import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInputSection from './ui/TodoInputSection';
import TodoListSection from './ui/TodoListSection';

// Define the Todo interface
interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'done';
}

export default function TodoApp() {
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
        {
          id: Date.now().toString(),
          title,
          description,
          status: 'active',
        },
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
    console.log('Deleting todo with id:', id); // Debug log
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'active' ? 'done' : 'active' }
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
      <View style={styles.divider} />
      <TodoListSection
        todos={filteredTodos}
        filter={filter}
        onFilterChange={setFilter}
        onToggleStatus={toggleTodoStatus}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});