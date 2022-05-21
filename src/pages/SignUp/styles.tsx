import styled from 'styled-components/native';
import { style } from '../../globalStyles';

export const ButtonsView = styled.View`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

export const NextButton = styled.TouchableOpacity`
    padding: 20px 30px;
    backgroundColor: ${style.colors.backgroundColor};
    borderRadius: 10px;
    width: 55%;
    justifyContent: center;
    alignItems: center;
`
export const BackButton = styled.TouchableOpacity`
    padding: 20px 30px;
    backgroundColor: ${style.colors.primary};
    borderRadius: 10px;
    width: 35%;
    justifyContent: center;
    alignItems: center;
`