import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {  colors, ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import * as SplashScreen from 'expo-splash-screen';

import { Platform } from 'react-native';

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <ThemeProvider useDark={colorScheme === 'dark'}>

            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ThemeProvider>


      </SafeAreaProvider>
    );
  }
}
