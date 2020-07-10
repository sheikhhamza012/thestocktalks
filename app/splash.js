import React ,{ Component } from 'react';
import { View,Image,ImageBackground ,AsyncStorage} from 'react-native';
import {axios} from './reuseableComponents/externalFunctions'
import {api} from './constants' 
import Text from './reuseableComponents/Text'
import {colors} from './constants'

class App extends Component {
    state = {  }
    
    render() { 
        return ( 
            <View style={{backgroundColor:colors.primaryBackground,flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:colors.textLight,fontSize:34}}>
                    The Stock Talks
                </Text>

            </View>
         );
    }
}
 
export default App;