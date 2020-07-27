import React, { Component } from 'react';
import { View,TouchableOpacity,Platform,Image, ActivityIndicator ,AsyncStorage} from 'react-native';
import Text from '../reuseableComponents/Text'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import imports from '../imports'
import {colors,api} from '../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { connect } from 'react-redux';
import {axios} from '../reuseableComponents/externalFunctions'

const Stack = createStackNavigator();

@connect(state=>state)
export default class App extends Component {
  state = { isLoggingIn:true }
  componentDidMount=()=>{
    setTimeout(async()=>{
      var token = await AsyncStorage.getItem('token')
      var firstName = await AsyncStorage.getItem('firstName')
      this.setState({isLoggingIn:false})
      if(token){
        this.props.dispatch({type:"LOGIN",data:firstName})
      }
    },1000 )
  }
  asGuest=()=>{
    this.setState({isLoading:true})
    axios('get',api.guest).then(async ({data})=>{
      this.setState({isLoading:false})
      if(data.error){
          alert(data.msg);
          return
      }
      AsyncStorage.setItem('token',data.token)
      AsyncStorage.setItem('name',data.name)
      this.props.dispatch({type:'LOGIN',data:data.name})
  }).catch(e=>{
      this.setState({isLoading:false})
      this.refs.toast.show(e.message)
      }
  )
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
          <Stack.Screen name="Home" component={imports.home} options={({navigation})=>({
            headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
            headerTintColor:colors.textDark,
            headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}></Text>,
            headerRight:props=>(<TouchableOpacity><Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>{this.props.name}</Text></TouchableOpacity>),
            headerLeft:props=><Hamburger {...props} navigation={navigation}/>
          })} />
          :
          <>
            <Stack.Screen name="Login" component={imports.login} options={({navigation})=>({
              headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}>Log In</Text>,
              headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
              headerTintColor:colors.textDark,
              headerRight:props=>{
                return(
                  this.state.isLoading?
                    <ActivityIndicator size="small" style={{marginRight:10}} color={colors.textLight}/>
                    :
                    <TouchableOpacity onPress={this.asGuest}>
                      <Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>
                        as Guest
                      </Text>
                    </TouchableOpacity>
                  
                  )},
              headerLeft:props=><Hamburger {...props} navigation={navigation}/>
            })} />

            <Stack.Screen name="Signup" component={imports.signup} options={({navigation})=>({
              headerTitle:props=><Text style={{fontSize:20,marginLeft:Platform.OS==="ios"?-100: 20,color:colors.textDark}}>Sign Up</Text>,
              headerStyle:{backgroundColor:colors.primaryBackground,elevation: 0,shadowOpacity: 0,borderBottomWidth: 0},
              headerTintColor:colors.textDark,
              
              headerRight:props=>{
                return(
                  this.state.isLoading?
                    <ActivityIndicator size="small" style={{marginRight:10}} color={colors.textLight}/>
                    :
                    <TouchableOpacity onPress={this.asGuest}>
                      <Text style={{textDecorationLine:"underline",color:colors.textLight,fontSize:16,marginRight:15}}>
                        as Guest
                      </Text>
                    </TouchableOpacity>
                  
                  )},
              headerLeft:props=><Hamburger {...props} navigation={navigation}/>
            })} />
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
      <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
        <Image style={{width:30,marginLeft:15,aspectRatio:1,height:undefined,tintColor:colors.textLight}} source={require('../images/menu.png')}/>
      </TouchableOpacity>
      );
  }
}
 
