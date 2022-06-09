import styled from 'styled-components/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const MainContainer = styled.View`
  margin-top: ${hp('3%')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const BarContainer = styled.View`
  width: 85%;
  margin-right: ${wp('2%')};
`