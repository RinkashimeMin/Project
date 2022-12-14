/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import UserScreen from './src/screens/UserScreen/UserScreen';
import ConfigureProfile from './src/screens/UserScreen/ConfigureProfile';
import DetailsScreen from './src/screens/ProductsScreen/DetailsScreen';
import AboutScreen from './src/screens/AboutScreen/AboutScreen';
import ProfileScreen from './src/screens/UserScreen/MyProfile';
import CheckoutScreen from './src/screens/CartScreen/CheckoutScreen';
import SplashScreen2 from './src/screens/SplashScreen/SplashScreen';
import SplashScreen from 'react-native-splash-screen';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/components/Context/Context';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import {UserContext} from './src/components/Context/UserContext';
import {Provider} from 'react-native-paper';
import {AppNavigator} from './src/Navigator/appnavigator';
//import {io} from 'socket.io-client';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  //const socket = io.connect('http://localhost:4000');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(true);
  const [isLogged, setIsLogged] = React.useState('');

  const Tab = createDrawerNavigator();

  const Stack = createStackNavigator();

  //const Stack = createDrawerNavigator();

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken('secrettoken');
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken(null);
      setIsLoading(false);
    },
  }));

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken != null ? (
          <Stack.Navigator
            initialRouteName="LandingScreen"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="AboutScreen" component={AboutScreen} />
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="UserScreen" component={UserScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Splash" component={SplashScreen2} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              name="ConfigureProfile"
              component={ConfigureProfile}
            />
          </Stack.Navigator>
        ) : (
          <SignInScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
