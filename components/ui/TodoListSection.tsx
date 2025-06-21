import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'done';
}

interface TodoListSectionProps {
  todos: Todo[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onToggleStatus: (id: string) => void;
  onUpdateTodo: (id: string, newTitle: string, newDescription: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoListSection({
  todos,
  filter,
  onFilterChange,
  onToggleStatus,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const renderTodo = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item.id;

    const handleDelete = () => {
      console.log('Delete button pressed for id:', item.id); // Debug log
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this todo?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              console.log('Confirmed delete for id:', item.id); // Debug log
              onDeleteTodo(item.id);
            },
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
            <Button
              title="Cancel"
              onPress={() => setEditingId(null)}
              color="gray"
            />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.todoItem, item.status === 'done' && styles.todoDone]}
              onPress={() => onToggleStatus(item.id)}
            >
              <Text style={styles.todoTitle}>{item.title}</Text>
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
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['All', 'Active', 'Done'].map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterButton,
              filter === filterOption && styles.filterButtonActive,
            ]}
            onPress={() => onFilterChange(filterOption)}
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
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  list: {
    flex: 1,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  todoItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
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
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
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
});