import React, { useState } from 'react';
import { useLinkTo } from '@react-navigation/native';

import { SidebarBackground, SidebarSandwichIcon, SidebarNode, SidebarNodeText } from './styles'

import FeatherIcons from 'react-native-vector-icons/Feather'
import { style } from '../../globalStyles';

const Sidebar = () => {
    const linkTo = useLinkTo();
    const [isOpen, setIsOpen] = useState(true);
    const handleSignOut = async () => {
      linkTo('/admin')
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

            <SidebarNode isOpen={isOpen}>
                <FeatherIcons name='log-out' size={25} />
                <SidebarNodeText isOpen={isOpen} onPress={handleSignOut}>Sair</SidebarNodeText>
            </SidebarNode>
        </SidebarBackground>
    )
}

export default Sidebar;