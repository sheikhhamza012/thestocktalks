import React, { Component } from 'react';
import { View,TouchableOpacity,Platform,Image } from 'react-native';
import Text from '../reuseableComponents/Text'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import imports from '../imports'
import {colors} from '../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();
export default class App extends Component {
  state = {  }
  render() {
    return ( 
      <Stack.Navigator>
        <Stack.Screen name="Login" component={imports.login} options={{
          headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}>Log In</Text>,
          headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
          headerTintColor:colors.textDark,
          headerRight:props=>(<TouchableOpacity><Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>as Guest</Text></TouchableOpacity>),
          headerLeft:props=><Hamburger {...props}/>
        }} />
        <Stack.Screen name="Home" component={imports.splash} options={{
            headerShown:false
        }} />
      </Stack.Navigator> 
    );
  }
}

class Hamburger extends Component {
  state = {  }
  render() { 
    return (
      <TouchableOpacity>
        <Image style={{width:30,marginLeft:15,aspectRatio:92/50,height:undefined}} source={require('../images/menu.png')}/>
      </TouchableOpacity>
      );
  }
}
 
