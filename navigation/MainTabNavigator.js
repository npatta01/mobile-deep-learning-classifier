import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import DebugScreen from '../screens/DebugScreen';


  


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


const ImagePickerStack = createStackNavigator({
  ImagePicker: ImagePickerScreen,
});

ImagePickerStack.navigationOptions = {
  tabBarLabel: 'IP',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const DebugStack = createStackNavigator({
  Debug: DebugScreen,
});

DebugStack.navigationOptions = {
  tabBarLabel: 'Debug',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  ImagePickerStack,
  DebugStack,
  SettingsStack,
});
