import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TodoFilter({ filter, onFilterChange }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});