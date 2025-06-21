import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inProgress' | 'done';
}

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (id: string) => void;
  onUpdateTodo: (id: string, newTitle: string, newDescription: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggleStatus,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const renderTodo = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item.id;
    const isChecked = item.status === 'done';

    const handleDelete = () => {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this todo?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => onDeleteTodo(item.id),
          },
        ]
      );
    };

    const handleEdit = () => {
      setEditingId(item.id);
      setEditTitle(item.title);
      setEditDescription(item.description);
    };

    const saveEdit = () => {
      if (editTitle.trim()) {
        onUpdateTodo(item.id, editTitle, editDescription);
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
      }
    };

    return (
      <View style={styles.todoContainer}>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              autoFocus
            />
            <TextInput
              style={styles.input}
              value={editDescription}
              onChangeText={setEditDescription}
            />
            <Button title="Save" onPress={saveEdit} />
            <Button title="Cancel" onPress={() => setEditingId(null)} color="gray" />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.todoItem, isChecked && styles.todoDone]}
              onPress={() => onToggleStatus(item.id)}
            >
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isChecked}
                  onValueChange={() => onToggleStatus(item.id)}
                  tintColors={{ true: '#6200EE', false: '#ccc' }}
                />
                <Text style={styles.todoTitle}>{item.title}</Text>
              </View>
              <Text style={styles.todoDescription}>{item.description}</Text>
              <Text style={styles.todoStatus}>Status: {item.status}</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleEdit}>
                <Ionicons name="create-outline" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

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
  list: { flex: 1 },
  todoContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  todoItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  todoDone: { backgroundColor: '#e6ffe6' },
  todoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  todoDescription: { fontSize: 14, color: '#666', marginBottom: 5 },
  todoStatus: { fontSize: 12, color: '#888' },
  iconContainer: { flexDirection: 'row', marginLeft: 10 },
  deleteIcon: { marginLeft: 10 },
  editContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
});