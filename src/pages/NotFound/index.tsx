import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NotFoundView } from './style'

const NotFound = (props: any) => {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <NotFoundView>
          <Text style={{ fontSize: 40 }}> Something wrong is not right! </Text> 
          <Text style={{ fontSize: 50, fontWeight: 'bold'}}> 404  </Text>
          <Text style={{ fontSize: 40 }}> Page not found </Text>
        </NotFoundView>
      </SafeAreaView>
    );
  }

export default NotFound;