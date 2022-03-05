import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Sidebar from  './src/components/Sidebar'

export default function App() {
  return (
    // <SignUp/>
    // <SignIn/>
    <Sidebar/>
  );
}