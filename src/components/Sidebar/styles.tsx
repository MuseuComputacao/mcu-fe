import styled from 'styled-components/native';
import { style } from '../../globalStyles';

export const SidebarBackground = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${style.colors.backgroundColor};
    height: 100%;
    width: ${props => props.isOpen ? "250px" : "80px"};
    padding: ${props => props.isOpen ? "15px" : "15px 0"};
`;

export const SidebarSandwichIcon = styled.TouchableOpacity`
    position: ${props => props.isOpen ? "relative" : "inherit"};
    margin-right: ${props => props.isOpen ? "10px" : "0"};
    margin-left: ${props => props.isOpen ? "auto" : "0"};
    margin-bottom: 10px;
`;

export const SidebarNode = styled.TouchableOpacity`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.isOpen ? "flex-start" : "center"};
    padding: 10px;
    width: ${props => props.isOpen ? "90%" : "80%"};
    background-color: ${style.colors.white};
    border-radius: 10px;
`;

export const SidebarNodeText = styled.Text`
    display: ${props => props.isOpen ? "flex" : "none"};
    margin-left: 10px;
`;