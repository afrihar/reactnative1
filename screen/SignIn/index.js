import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

const SignInScreen = ({onSignIn, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Public Sign In Screen</Text>
      <Button title="Sign In" onPress={onSignIn} />
      <Text>OR</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
      <Button
        title="Forget Password"
        onPress={() => navigation.navigate('Forget Password')}
      />
    </View>
  );
};

export default SignInScreen;
