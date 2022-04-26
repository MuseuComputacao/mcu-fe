import React, { useState } from 'react';
import { useLinkTo } from '@react-navigation/native';

import { SidebarBackground, SidebarSandwichIcon, SidebarNode, SidebarNodeText } from './styles'

import FeatherIcons from 'react-native-vector-icons/Feather'
import { style } from '../../globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const Sidebar = () => {
    const linkTo = useLinkTo();
    const [isOpen, setIsOpen] = useState(true);
    const handleSignOut = async () => {
      const value = await AsyncStorage.getItem('@user')
      const teste = JSON.parse(value)
      const config = {
        headers: {
          'access-token': teste.token,
          uid: teste.uid,
          client:teste.client
        }
      }
      await axios
      .delete('http://localhost:3000/api/auth/sign_out', config)
      .then(() => {
        linkTo('/admin')
      })
      .catch(error => {
          console.log(error)
      });
    }

    return(
        <SidebarBackground isOpen={isOpen}>
            <SidebarSandwichIcon isOpen={isOpen} onPress={() =>setIsOpen(!isOpen)}>
                <FeatherIcons name='menu' size={25} color={style.colors.white}/>
            </SidebarSandwichIcon>

            <SidebarNode isOpen={isOpen}>
                <FeatherIcons name='home' size={25} />
                <SidebarNodeText isOpen={isOpen}>Dashboard</SidebarNodeText>
            </SidebarNode>

            <SidebarNode isOpen={isOpen}>
                <FeatherIcons name='pie-chart' size={25} />
                <SidebarNodeText isOpen={isOpen}>Gráficos</SidebarNodeText>
            </SidebarNode>

            <SidebarNode isOpen={isOpen}>
                <FeatherIcons name='user' size={25} />
                <SidebarNodeText isOpen={isOpen}>Usuários</SidebarNodeText>
            </SidebarNode>

            <SidebarNode isOpen={isOpen} onPress={handleSignOut}>
                <FeatherIcons name='log-out' size={25} />
                <SidebarNodeText isOpen={isOpen}>Sair</SidebarNodeText>
            </SidebarNode>
        </SidebarBackground>
    )
}

export default Sidebar;