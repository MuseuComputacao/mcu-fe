import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/index'
import { View, Text } from 'react-native';
import { DashboardView } from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  useEffect(() => {
    handleUserData()
  },[])

  const [isOpen, setIsOpen] = useState<boolean>(true);

  function getIsOpenProp(getIsOpen: boolean){
    setIsOpen(getIsOpen);
  }

  const [user, setUser] = useState<any>({})

  const handleUserData = async () => {
    const userData =  await AsyncStorage.getItem('@user')
    setUser(JSON.parse(userData ?? '{}'))
  }

    return(
      <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Sidebar func={getIsOpenProp}/>
        <DashboardView isOpen={isOpen}>
         <Text style={{fontSize: 23, textAlign: 'left', margin: 50, lineHeight: 36.8}}>
          Olá, <br/>
          <strong>{user.name}</strong> bem vindo ao admin do museu da computação da UFRJ. <br/>
          ❤ 🤖 ❤
         </Text>
        </DashboardView>
      </View>
    )
}

export default Dashboard;
