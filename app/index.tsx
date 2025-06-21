import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodoApp from '../components/TodoApp';

export default function Index() {
  return (
    <View style={styles.container}>
      <TodoApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});