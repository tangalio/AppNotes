import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './srcs/navigator/AuthNavigator';
import AppNavigatior from './srcs/navigator/AppNavigator';
import { firebase } from './srcs/services/firebase/config'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  //
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);

  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {
        user ? <AppNavigatior /> : <AuthNavigator />
      }
    </NavigationContainer>
  );
}

