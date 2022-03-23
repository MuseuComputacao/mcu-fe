import styled from 'styled-components/native';
import { style } from '../../globalStyles';

export const SignInView = styled.View`
    width: 30%;
    display: flex;
    flexDirection: column;
    margin-top: 64px;
`;

export const SignInTitleView = styled.View`
    display: flex;
    flexDirection: column;
    alignItems: center;
    margin-bottom: 25px;
`;

export const Title = styled.Text`
    font-size: 24px;
    margin-top: 10px;
`;

export const InputView = styled.View`
    margin-bottom: 25px;
`;

export const ForgotPasswordView = styled.View`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 25px;
`;

export const ForgotPassword = styled.Text`
    color: ${style.colors.primary};
    font-size: 16px;
    text-decoration: underline;
    text-decoration-color: ${style.colors.primary}
`;

export const SubmitButton = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    border-radius: ${style.borderRadius};
    background-color: ${style.colors.primary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 50px;
`;