import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from "../screens/HomeScreen";
import DebugScreen from '../screens/DebugScreen';
import AboutScreen from '../screens/AboutScreen';


  

const HomeScreenStack = createStackNavigator({
  Home: HomeScreen,
});

HomeScreenStack.navigationOptions = {
  tabBarLabel: 'HOME',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const DebugStack = createStackNavigator({
  Debug: DebugScreen,
});

DebugStack.navigationOptions = {
  tabBarLabel: 'DEBUG',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'ABOUT',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information' : 'md-information'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeScreenStack,
  AboutStack,
  DebugStack,
});
