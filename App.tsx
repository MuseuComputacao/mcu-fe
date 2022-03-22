import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screen from './src/pages/index';
import routes from './src/router/index'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={routes}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={screen.Home} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={screen.SignIn} options={{ headerShown: false }}  />
        <Stack.Screen name="Dashboard" component={screen.Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}