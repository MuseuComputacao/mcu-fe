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

export const SignInView = styled.View`
    width: 60%;
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

export const InputView2 = styled.View`
    margin-bottom: 25px;
    width: 30%;
`;

export const InputView3 = styled.View`
    margin-bottom: 25px;
    width: 45%;
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
`

export const SubtitlesView = styled.View `
    margin-top: 45px;
    margin-bottom: 45px;
`

export const SubtitlesText = styled.Text `
    font-size: 25px;
    color: "#FDFDFD"
    font-family: NunitoSansBold;
    text-align: left;

    margin-bottom: 20px;
`

export const ImageContainer = styled.View `
    background-color: "#FFFFFF";
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    border-style: dashed
    border-width: 2px;
    border-color: ${style.colors.primary};

    padding: 5px 52px 5px 52px;
`

export const ProductImage = styled.Image `
    width: 200px;
    height: 200px;
`