import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Sidebar from  './src/components/Sidebar'

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://mychat.com', 'mychat://'],
  config: {
    screens: {
      Home: '',
      Admin: 'admin',
      Dashboard: 'admin/dashboard'
    }
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={SignIn} options={{ headerShown: false }}  />
        <Stack.Screen name="Dashboard" component={Sidebar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}