import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';

import { style } from '../../globalStyles';
import {MainContainer, BarContainer} from './styles';

import ProgressBar from "react-native-animated-progress";

interface ProgressBarProps {
  progress: number;
  height: number;
  trackColor: any;
  backgroundColor: any;
  iconColor: any;
}

const Progress = ({progress, height, trackColor, backgroundColor, iconColor}:ProgressBarProps) => {
  return (
    <MainContainer>
      <BarContainer>
        <ProgressBar
          progress={progress}
          height={height}
          trackColor={trackColor}
          backgroundColor={backgroundColor}
        />
      </BarContainer>
      <Ionicon
        name="md-checkmark-circle-sharp"
        size={32}
        color={iconColor}
      />
    </MainContainer>
  )
}

export default Progress
