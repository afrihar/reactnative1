import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PasswordChangeScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>Protected Password Change Screen</Text>
    </View>
  );
};

export default PasswordChangeScreen;
