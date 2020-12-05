import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native';

import LandingScreen from './screen/Landing';
import HomeScreen from './screen/Home';
import SignInScreen from './screen/SignIn';
import SignUpScreen from './screen/SignUp';
import ForgetPasswordScreen from './screen/PasswordForget';
import PasswordChangeScreen from './screen/PasswordChange';
import AdminScreen from './screen/Admin';
import AccountScreen from './screen/Account';
import ProfileScreen from './screen/Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import QueryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTab} />
      <Drawer.Screen name="Forget Password" component={ForgetPasswordScreen} />
      <Drawer.Screen name="Password Change" component={PasswordChangeScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Admin" component={AdminScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const handleSignIn = () => {
    console.log('REQUEST');
    axios
      .post(
        'http://192.168.1.5:8080/auth/realms/dppapp_sso/protocol/openid-connect/token',
        QueryString.stringify({
          grant_type: 'password',
          client_id: 'mobile',
          client_secret: '48d14ece-196c-4157-bd14-8571e9a60573',
          username: 'employee1',
          password: 'user',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((response) => {
        const jsonValue = JSON.stringify(response.data);
        console.log(response);
        AsyncStorage.setItem('@storage_Key', jsonValue);
        response.status == '200'
          ? setIsAuthenticated(true)
          : setIsAuthenticated(false);
      })
      .catch((err) => console.log('api Erorr: ', err.response));
  };
  const handleSignOut = async () => {
    await AsyncStorage.removeItem('@storage_Key');
    setIsAuthenticated(false);
  };
  const handleSignUp = () => {
    setIsAuthenticated(true);
  };
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Screen
            name="Home"
            component={HomeDrawer}
            options={({route, navigation}) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
              headerLeft: () => (
                <Button
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  title="Menu"
                />
              ),
              headerRight: () => (
                <Button onPress={handleSignOut} title="Sign Out" />
              ),
            })}
          />
        ) : (
          <>
            <RootStack.Screen
              name="Landing"
              component={LandingScreen}
              options={{animationTypeForReplace: 'pop'}}
            />
            <RootStack.Screen name="Sign In">
              {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
            </RootStack.Screen>
            <RootStack.Screen name="Sign Up">
              {(props) => <SignUpScreen {...props} onSignUp={handleSignUp} />}
            </RootStack.Screen>
            <RootStack.Screen
              name="Forget Password"
              component={ForgetPasswordScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
