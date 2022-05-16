import styled from 'styled-components/native';
import { style } from '../../globalStyles';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const DashboardView = styled.View`
    display: flex;
    flex-direction: column;
    width: ${props => props.isOpen ? 'calc(100% - 250px)' : 'calc(100% - 80px)'};
`;

export const SignInTitleView = styled.View`
    display: flex;
    flexDirection: column;
    alignItems: center;
    margin-bottom: 25px;
`;