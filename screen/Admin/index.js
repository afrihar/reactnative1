import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AdminScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>Protected Admin Screen</Text>
    </View>
  );
};

export default AdminScreen;
