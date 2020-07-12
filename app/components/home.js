import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Button  from '../reuseableComponents/button';
import {AntDesign as Icon} from '@expo/vector-icons'

import {colors}  from '../constants';
import { TextInput } from 'react-native-gesture-handler';
class App extends Component {
    state = {  }
    render() { 
        const {home} = this.props
        return (
            <ScrollView style={styles.root} contentContainerStyle={{flexGrow:1}}>
                <Field text="Type to search here" type="search"/>
                <View style={{height:15}}/>
                <Text onPress={()=>this.props.dispatch({type:"LOGOUT"})} style={{fontSize:18,color:colors.textDark}}>
                    {home.stock.stockName}
                </Text>  
                <Text style={{fontSize:16,color:colors.textLight}}>
                    {home.stock.company}
                </Text>  
               <View style={{padding:20,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:42,color:colors.textDark}}>
                        {home.stock.price}
                    </Text> 
                    <Text style={{fontSize:16,color:colors.green}}>
                        +{home.stock.up+"%  "}
                        <Text style={{fontSize:16,color:colors.red}}>
                            -{home.stock.down}%
                        </Text> 
                    </Text> 
               </View>
            </ScrollView>
        )}
}
const styles=StyleSheet.create({
    root:{
        
        // flexGrow:1,
        backgroundColor:colors.primaryBackground,
        padding:15,
        paddingTop:5
    },
    commentContainer:{

    },
    searchContainer:{
        padding:7,
        paddingHorizontal:15,
        backgroundColor:colors.searchBackground,
        borderRadius:5
    },
    inputField:{
        color:colors.textDark,
        fontSize:16,
        fontFamily:'ABeeZee',
        flex:1
    }


})

class Field extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    containerStyle=()=>{
        switch(this.props.type){
            case "comment":

                return styles.commentContainer
            
            default:
                return styles.searchContainer
        }
    }
    iconColor=()=>{
        switch(this.props.type){
            case "comment":

                return colors.textLight
            
            default:
                return colors.textDark
        }
    }
    render() {
        return (
            <View style={[this.containerStyle(),{flexDirection:"row"}]}>
                <TextInput 
                    style={styles.inputField}
                    selectionColor={colors.textLight}
                    placeholderTextColor={colors.textLight}
                    placeholder={this.props.text}
                />
                <Icon name="search1" color={this.iconColor()} size={16}/>
            </View>
        )
    }
}

export default App;