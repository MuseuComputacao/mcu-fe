declare module 'styled-components/native' {
  const styled: any;

  export default styled;
}

declare module 'react-native-animated-progress' {
  import * as React from 'react';

  interface ProgressBarProps {
    progress?: number;
    height?: number;
    trackColor?: string;
    backgroundColor?: string;
  }

  const ProgressBar: React.ComponentType<ProgressBarProps>;

  export default ProgressBar;
}
