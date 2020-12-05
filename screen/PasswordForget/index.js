import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ForgetPasswordScreen = (onSignUp) => {
  return (
    <View styles={styles.container}>
      <Text>Public Forget Password Screen</Text>
    </View>
  );
};

export default ForgetPasswordScreen;
