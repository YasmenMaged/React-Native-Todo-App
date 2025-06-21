import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TodoList({ todos, onToggleStatus }) {
  const renderTodo = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.todoItem,
        item.status === 'done' && styles.todoDone,
      ]}
      onPress={() => onToggleStatus(item.id)}
    >
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoDescription}>{item.description}</Text>
      <Text style={styles.todoStatus}>
        Status: {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderTodo}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  todoDone: {
    backgroundColor: '#e6ffe6',
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  todoStatus: {
    fontSize: 12,
    color: '#888',
  },
});