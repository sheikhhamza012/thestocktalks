import React, { Component } from 'react';
import { View,TouchableOpacity,Platform,Image } from 'react-native';
import Text from '../reuseableComponents/Text'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import imports from '../imports'
import {colors} from '../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { connect } from 'react-redux';
const Stack = createStackNavigator();

@connect(state=>state)
export default class App extends Component {
  state = { isLoggingIn:true }
  componentDidMount=()=>{
    setTimeout(()=>{
      this.setState({isLoggingIn:false})
    },1000 )
  }
  render() {
    return ( 
      <Stack.Navigator>
        {this.state.isLoggingIn&&
          <Stack.Screen name="Splash" component={imports.splash} options={{
              headerShown:false
          }} />
        }
        {this.props.isLoggedIn?
          <Stack.Screen name="Home" component={imports.home} options={{
            headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
            headerTintColor:colors.textDark,
            headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}></Text>,
            headerRight:props=>(<TouchableOpacity><Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>as Guest</Text></TouchableOpacity>),
            headerLeft:props=><Hamburger {...props}/>
          }} />
          :
          <>
            <Stack.Screen name="Login" component={imports.login} options={{
              headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}>Log In</Text>,
              headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
              headerTintColor:colors.textDark,
              headerRight:props=>(<TouchableOpacity><Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>as Guest</Text></TouchableOpacity>),
              headerLeft:props=><Hamburger {...props}/>
            }} />

            <Stack.Screen name="Signup" component={imports.signup} options={{
              headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}>Sign Up</Text>,
              headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
              headerTintColor:colors.textDark,
              headerRight:props=>(<TouchableOpacity><Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>as Guest</Text></TouchableOpacity>),
              headerLeft:props=><Hamburger {...props}/>
            }} />
          </>
      }
        
        
        
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
 
