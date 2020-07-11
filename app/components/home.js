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
                <Text onPress={()=>this.props.dispatch({type:"LOGOUT"})} style={{fontSize:24,color:colors.textDark}}>
                    Join Us!
                </Text>  
               
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