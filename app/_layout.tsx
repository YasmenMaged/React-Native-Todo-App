import { Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../navigation/TabNavigator';

export default function Layout() {
  console.log('Layout rendering with NavigationContainer'); // Debug log
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}