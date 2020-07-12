import React, { Component } from 'react';
import { View,TouchableHighlight,TouchableOpacity,Animated,TextInput,StyleSheet, Dimensions} from 'react-native';
import Text from '../reuseableComponents/Text'
import {AntDesign as Icon} from '@expo/vector-icons'
import {colors} from '../constants'
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class App extends Component {
    state = {showPassword:this.props.password,value:"",labelSize:new Animated.Value(20),containerHeight:new Animated.Value(50)}    
    onFocus=()=>{
        Animated.parallel([
            Animated.timing(this.state.labelSize, {
                toValue: 14,
                duration: 150,
                useNativeDriver:false

            }),
            Animated.timing(this.state.containerHeight, {
                toValue: 70,
                duration: 150,
                useNativeDriver:false
              }),
          ]).start();
          this.setState({showField:true},()=>this.field.focus())
    }
    onBlur=()=>{
        if(this.state.value==""){

            Animated.parallel([
                Animated.timing(this.state.labelSize, {
                    toValue: 20,
                    duration: 150,
                    useNativeDriver:false

                }),
                Animated.timing(this.state.containerHeight, {
                    toValue: 50,
                    duration: 150,
                    useNativeDriver:false

                })
            ]).start();
            this.setState({showField:false})
        }
    }
    render() { 
        const {labelText,password,errorMsg} = this.props
        return (
            <>
                <AnimatedTouchable onPress={this.onFocus} style={{borderBottomColor:colors.textLight,borderBottomWidth:1,paddingVertical:10,height:this.state.containerHeight}}>
                        <Animated.Text style={{color:colors.textDark,fontSize:this.state.labelSize,fontFamily:"ABeeZee"}}>{labelText}</Animated.Text>
                        <View style={{flexDirection:"row"}}>

                            {this.state.showField&&
                                < TextInput style={styles.fieldStyle}
                                    onChangeText={t=>this.setState({value:t})}
                                    selectionColor={colors.textLight}
                                    ref={r=>this.field=r}
                                    onBlur={this.onBlur}
                                    onFocus={this.onFocus}
                                    secureTextEntry={this.state.showPassword}
                                />
                            }
                            {password&&
                                <TouchableHighlight style={styles.eye} onPress={()=>this.setState({showPassword:!this.state.showPassword})} >
                                    <Icon name="eye" size={20} color={colors.textDark} />
                                </TouchableHighlight>
                            }
                        </View>
                </AnimatedTouchable>
                {errorMsg&&
                    <Text style={{color:"red" , marginTop:5}}>{errorMsg}</Text>
                }
            </>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        borderBottomWidth:1,
        borderBottomColor:colors.grey

    },
    eye:{
        position:"absolute",
        bottom:2,
        right:0,
        paddingHorizontal:10
    },
    fieldStyle:{
        width:Dimensions.get('screen').width-50,
        paddingTop:5,
        fontFamily:'ABeeZee',
        color:colors.textDark,
        fontSize:20,
    }
})
export default App;