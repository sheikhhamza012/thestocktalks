import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Field  from '../reuseableComponents/field';
import Button  from '../reuseableComponents/button';
import {colors}  from '../constants';
class App extends Component {
    state = {  }

    logIn=()=>{
        this.props.dispatch({type:"LOGIN"})
    }
    render() { 
        return (
            <ScrollView style={styles.root} contentContainerStyle={{alignItems:"stretch"}}>
                <Text style={{fontSize:24,color:colors.textDark}}>
                    Welcome Back!
                </Text>  
                <View style={{height:30}}/>
                <Field  labelText={"Email"}
                        handleInput={this.handleInput}
                />
                <View style={{height:50}}/>
                <Field  labelText={"Password"}
                        password={true}
                        handleInput={this.handleInput}
                />
                <View style={{height:20}}/>
                <Text style={{color:colors.textLight,textDecorationLine:"underline"}}>Forgot Password?</Text>
                <View style={{height:20}}/>
                <Button onPress={this.logIn} text="Log In" style={{alignSelf:"center",height:45}}/>
                <View style={{height:20}}/>
                <Text onPress={()=>this.props.navigation.navigate("Signup")} style={{color:colors.textLight,textAlign:"center",textDecorationLine:"underline"}}>Dont have an account yet? <Text style={{color:colors.textDark}}>Sign Up</Text></Text>
                <View style={{height:40}}/>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1,height:2,backgroundColor:colors.textLight,marginTop:10}}></View>
                    <Text style={{color:colors.textLight,paddingHorizontal:10,textAlign:"center",textDecorationLine:"underline"}}>  or login with  </Text>
                    <View style={{flex:1,height:2,backgroundColor:colors.textLight,marginTop:10,}}></View>
                </View>

                <View style={{height:40}}/>
                <View style={{flexDirection:"row"}}>
                <Button iconLeft="google" text="Google"  type="google" style={{alignSelf:"center",height:45,flex:1}}/>
                <View style={{width:10}}/>
                <Button iconLeft="facebook-square" color={colors.textDark} text="Facebook" type="fb" style={{alignSelf:"center",height:45,flex:1}}/>

                </View>
                
            </ScrollView>
        )}
}
const styles=StyleSheet.create({
    root:{
        
        flex:1,
        backgroundColor:colors.primaryBackground,
        padding:15
    }

})
export default App;