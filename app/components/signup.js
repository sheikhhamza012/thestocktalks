import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Field  from '../reuseableComponents/field';
import Button  from '../reuseableComponents/button';
import {colors}  from '../constants';
class App extends Component {
    state = {  }
    render() { 
        return (
            <ScrollView style={styles.root} contentContainerStyle={{flexGrow:1}}>
                <Text style={{fontSize:24,color:colors.textDark}}>
                    Join Us!
                </Text>  
                <View style={{height:30}}/>
                <Field  labelText={"First name"}
                        handleInput={this.handleInput}
                />
                <View style={{height:40}}/>
                <Field  labelText={"Last name"}
                        handleInput={this.handleInput}
                />
                <View style={{height:40}}/>
                <Field  labelText={"Email"}
                        handleInput={this.handleInput}
                />
                <View style={{height:40}}/>
                <Field  labelText={"Password"}
                        password={true}
                        handleInput={this.handleInput}
                />
                <View style={{height:40}}/>
                <Field  labelText={"Confirm password"}
                        password={true}
                        handleInput={this.handleInput}
                />
                <View style={{height:50}}/>
                
                <Button text="Sign Up" style={{alignSelf:"center",height:45}}/>
                <View style={{height:20}}/>
                <Text onPress={()=>this.props.navigation.navigate("Login")} style={{color:colors.textLight,textAlign:"center",textDecorationLine:"underline"}}>I already have an account? <Text style={{color:colors.textDark}}>Log in</Text></Text>
                <View style={{height:100}}/>
                
            </ScrollView>
        )}
}
const styles=StyleSheet.create({
    root:{
        
        // flexGrow:1,
        backgroundColor:colors.primaryBackground,
        padding:15
    }

})
export default App;