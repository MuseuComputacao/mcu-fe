import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screen from './src/pages/index';
import routes from './src/router/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={routes}>
      <Stack.Navigator>
        <Stack.Screen name="NotFound" component={screen.NotFound} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={screen.Home} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={screen.SignIn} options={{ headerShown: false }}  />
        <Stack.Screen name="Dashboard" component={screen.Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Users" component={screen.Users} options={{ headerShown: false }} />
        <Stack.Screen name="AddUsers" component={screen.SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Items" component={screen.Items} options={{ headerShown: false }} />
        <Stack.Screen name="AddItems" component={screen.AddItems} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={screen.ChangePassword} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}