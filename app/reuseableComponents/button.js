import React, { Component } from 'react';
import {View,TouchableOpacity,ActivityIndicator, StyleSheet} from 'react-native';
import Text from '../reuseableComponents/Text'
import {colors} from '../constants'
import {AntDesign as Icon} from '@expo/vector-icons'

class App extends Component {
    state = {  }
    containerStyle=()=>{
        switch(this.props.type){
            case "fb":
                return styles.button.fb
            case "google":
                return styles.button.google
            default:
                return styles.button.mustard
        }
    }
    textStyle=()=>{
        switch(this.props.type){
            case "fb":
                return {color:colors.textDark}
            default:
                return styles.button.white
        }
    }
    render() { 
        return (
            <TouchableOpacity disabled={this.props.isLoading} onPress={this.props.onPress} style={[this.containerStyle(),styles.button.container,this.props.style]}>
                {this.props.iconLeft&&
                    <View style={{marginRight:10}}>
                        <Icon color={this.textStyle().color} name={this.props.iconLeft} size={20} />
                    </View>
                }
                {this.props.isLoading?
                <ActivityIndicator color={"#fff"} size={"small"}/>
                :
                <Text style={[this.textStyle(),styles.button.text]}>{this.props.text}</Text>
                }
            </TouchableOpacity>
          );
    }
}
const styles= {
    button:StyleSheet.create({
        container:{
            justifyContent:"center",
            alignItems:"center",
            borderRadius:5,
            width:"100%",
            height:"100%",
            flexDirection:"row"
        },
        text:{
            textAlign:"center",
            fontSize:20,
        },
        mustard:{
            backgroundColor:colors.mustard
        },
        white:{
            color:colors.white
        },
        fb:{
            backgroundColor:colors.fb
        },
        google:{
            backgroundColor:colors.textDark
        }
    })
}
 
export default App;