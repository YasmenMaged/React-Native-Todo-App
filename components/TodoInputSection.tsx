import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface TodoInputSectionProps {
  onAddTodo: (title: string, description: string) => void;
}

export default function TodoInputSection({ onAddTodo }: TodoInputSectionProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = () => {
    onAddTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});