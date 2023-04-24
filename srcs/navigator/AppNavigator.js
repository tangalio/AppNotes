import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';
import HomeNavigator from './HomeNavigator';
import ProfileScreen from '../screens/App/ProfileScreen/ProfileScreen';
import SettingScreen from '../screens/App/SettingScreen/SettingScreen';
import EncodeDecode from '../screens/App/EncodeDecode/EncodeDecode';
import Decode from '../screens/App/EncodeDecode/Decode';
import Shared from '../screens/App/Shared/Shared';
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    return (
        <>
            <StatusBar />
            <Drawer.Navigator initialRouteName="HomeScreen">
                <Drawer.Screen name="HomeScreen" component={HomeNavigator} options={{ headerShown: false }} />
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                <Drawer.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
                <Drawer.Screen name="EncodeDecode" component={EncodeDecode} />
                <Drawer.Screen name="Decode" component={Decode} options={{ headerShown: false }} />
                <Drawer.Screen name="Shared" component={Shared} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </>
    )
};

export default AppNavigator;
