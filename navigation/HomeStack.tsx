import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoApp from '../components/TodoApp';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodoApp" component={TodoApp} />
    </Stack.Navigator>
  );
}