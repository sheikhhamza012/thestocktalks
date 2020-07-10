import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {store} from './app/redux/redux'
import Navigator from './app/navigation/navigator'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts,ABeeZee_400Regular } from '@expo-google-fonts/abeezee';
import * as Font from 'expo-font';
export default class App extends React.Component {
  state={
    fontsLoaded: !true
  }
  componentDidMount=async()=>{
   await Font.loadAsync({
      'ABeeZee': require('./app/fonts/ABeeZee-Regular.ttf')
    })
    this.setState({ fontsLoaded: true });
  }
  render() {
    if(this.state.fontsLoaded){
      return ( 
        <Provider store={store}>
          <NavigationContainer>
            <Navigator/>
          </NavigationContainer>
        </Provider>
      );
    }else{
      return ( <></>)
    }
    }
  }
