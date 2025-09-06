import React, { useEffect, useState } from 'react';
import { useLinkTo } from '@react-navigation/native';

import { SidebarBackground, SidebarSandwichIcon, SidebarNode, SidebarNodeText } from './styles'

import FeatherIcons from 'react-native-vector-icons/Feather'
import { style } from '../../globalStyles';

import UserServices from '../../services/UserServices';

interface SidebarProp{
    func: any;
}

const Sidebar = ({func} :SidebarProp) => {
    const linkTo = useLinkTo();
    const [isOpen, setIsOpen] = useState(true);

    const handleSignOut = async () => {
      UserServices.logout().then(() => {
        linkTo('/admin')
      })
      .catch(error => {
          console.error(error)
      });
    }

    function handleSidebar(value: boolean){
        setIsOpen(value);
        func(value);
    }

    return(
        <SidebarBackground isOpen={isOpen}>
            <SidebarSandwichIcon isOpen={isOpen} onPress={() => handleSidebar(!isOpen)}>
                <FeatherIcons name='menu' size={25} color={style.colors.white}/>
            </SidebarSandwichIcon>

            <SidebarNode isOpen={isOpen} onPress={() => linkTo('/admin/dashboard')}>
                <FeatherIcons name='home' size={25} />
                <SidebarNodeText isOpen={isOpen}>Dashboard</SidebarNodeText>
            </SidebarNode>

            <SidebarNode isOpen={isOpen} onPress={() => linkTo('/admin/users')}>
                <FeatherIcons name='user' size={25} />
                <SidebarNodeText isOpen={isOpen}>Usuários</SidebarNodeText>
            </SidebarNode>

            <SidebarNode isOpen={isOpen} onPress={() => linkTo('/admin/items')}>
                <FeatherIcons name='monitor' size={25} />
                <SidebarNodeText isOpen={isOpen}>Items</SidebarNodeText>
            </SidebarNode>

            <SidebarNode isOpen={isOpen} onPress={handleSignOut}>
                <FeatherIcons name='log-out' size={25} />
                <SidebarNodeText isOpen={isOpen}>Sair</SidebarNodeText>
            </SidebarNode>
        </SidebarBackground>
    )
}

export default Sidebar;