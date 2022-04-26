import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/index'
import { View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  useEffect(() => {
    handleUserData()
  },[])

  const [user, setUser] = useState({})

  const handleUserData = async () => {
    const userData =  await AsyncStorage.getItem('@user')
    setUser(JSON.parse(userData))
    console.log(userData)
  }

    return(
      <View>
        <Sidebar />
        <View>
         <Text style={{fontSize: '23px', textAlign: 'center'}}>
          Olá {user.email} você é um {user.role}.
         </Text>
        </View>
      </View>
    )
}

export default Dashboard;