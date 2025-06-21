import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TodoInput from './ui/TodoInput';
import TodoFilter from './ui/TodoFilter';
import TodoList from './ui/TodoList';

export default function TodoApp() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTodo = () => {
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
      setTitle('');
      setDescription('');
    }
  };

  const toggleTodoStatus = (id) => {
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
      <TodoInput
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onAddTodo={addTodo}
      />
      <View style={styles.divider} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggleStatus={toggleTodoStatus} />
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