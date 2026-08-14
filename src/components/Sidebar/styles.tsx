import styled from 'styled-components/native';
import { style } from '../../globalStyles';

export const SidebarBackground = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${style.colors.backgroundColor};
    height: 100%;
    width: ${(props: { isOpen: boolean }) => props.isOpen ? "250px" : "80px"};
    padding: ${(props: { isOpen: boolean }) => props.isOpen ? "15px" : "15px 0"};
    transition: width 0.2s linear;
`;

export const SidebarSandwichIcon = styled.TouchableOpacity`
    position: ${(props: { isOpen: boolean }) => props.isOpen ? "realtive" : "inherit"};
    margin-right: ${(props: { isOpen: boolean }) => props.isOpen ? "10px" : "0"};
    margin-left: ${(props: { isOpen: boolean }) => props.isOpen ? "auto" : "0"};
    margin-bottom: 10px;
`;

export const SidebarNode = styled.TouchableOpacity`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${(props: { isOpen: boolean }) => props.isOpen ? "" : "center"};
    padding: 10px;
    width: ${(props: { isOpen: boolean }) => props.isOpen ? "90%" : "80%"};
    background-color: ${style.colors.white};
    border-radius: 10px;
    transition: none;

    &:hover{
        background-color: ${style.colors.primary};
    }
`;

export const SidebarNodeText = styled.Text`
    display: ${(props: { isOpen: boolean }) => props.isOpen ? "inline" : "none"};
    visibility: ${(props: { isOpen: boolean }) => props.isOpen ? "visible" : "hidden"};
    margin-left: 10px;
`;
