
import React, { Component } from 'react';
import {Text} from 'react-native'
import { useFonts,ABeeZee_400Regular } from '@expo-google-fonts/abeezee';


export default class App extends Component {
    render(){
        return ( 
            <Text {...this.props} style={[ {fontFamily:'ABeeZee'},this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}
