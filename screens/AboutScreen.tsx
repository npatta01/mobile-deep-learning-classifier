import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import {AppConfig} from  "../config"
import Markdown from 'react-native-markdown-display';
import  { useContext } from 'react';
import { ThemeContext } from 'react-native-elements';


export default function AboutScreen() {

  const { theme } = useContext(ThemeContext);
  
  console.log(theme.colors)
  return (
      <View style={styles.container}>

      <Markdown  style={{
                body: {color: theme.colors?.grey0 },
              
              }}>
            {AppConfig.description}
          </Markdown>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }
  

});
