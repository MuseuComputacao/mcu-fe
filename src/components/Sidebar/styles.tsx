import styled from 'styled-components/native';

export const SidebarBackground = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: blue;
    height: 100%;
    width: ${props => props.isOpen ? "250px" : "80px"};
    padding: ${props => props.isOpen ? "15px" : "15px 0"};
    transition: width 0.2s linear;
`;

export const SidebarSandwichIcon = styled.TouchableOpacity`
    position: ${props => props.isOpen ? "realtive" : "inherit"};
    margin-right: ${props => props.isOpen ? "10px" : "0"};
    margin-left: ${props => props.isOpen ? "auto" : "0"};
    margin-bottom: 10px;
`;

export const SidebarNode = styled.TouchableOpacity`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.isOpen ? "" : "center"};
    padding: 10px;
    width: ${props => props.isOpen ? "90%" : "80%"};
    background-color: ${props => props.isOpen ? "white" : "red"};
    border-radius: 10px;
    transition: none;
`;

export const SidebarNodeText = styled.Text`
    display: ${props => props.isOpen ? "inline" : "none"};
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    margin-left: 10px;
`;