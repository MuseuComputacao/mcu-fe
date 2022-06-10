import React from 'react';
import { View } from 'react-native';

const Home = (props: any) => {
    return (
      <View style={{ width: '100%', height: '100vh'}}>
        <iframe src='https://museucomputacao.github.io' width={'100%'} height={'100%'} frameBorder={0} />
      </View>
    );
  }

export default Home;