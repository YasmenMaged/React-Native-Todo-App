import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function TodoInput({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onAddTodo,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={onTitleChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={onDescriptionChange}
      />
      <Button title="Add Todo" onPress={onAddTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});