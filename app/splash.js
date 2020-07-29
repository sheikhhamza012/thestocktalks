import React ,{ Component } from 'react';
import { View,Image,ImageBackground ,AsyncStorage} from 'react-native';
import {axios} from './reuseableComponents/externalFunctions'
import {api} from './constants' 
import Text from './reuseableComponents/Text'
import {colors} from './constants'

class App extends Component {
    state = {  }
    componentDidMount() {
       
    }
    render() { 
        return ( 
            <Image style={{resizeMode:"cover",width:"100%",height:"100%"}} source={require('../assets/splash.png')}/>
         );
    }
}
 
export default App;