import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthenticationHeader = async() => {
    const value = await AsyncStorage.getItem('@user')
      const userData = JSON.parse(value)
      const config = {
        headers: {
          'access-token': userData.token,
          uid: userData.uid,
          client:userData.client
        }
      }

      return config;
}

export {
    getAuthenticationHeader
}