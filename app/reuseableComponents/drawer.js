import React, { Component } from 'react'
import  { ScrollView,SafeAreaView ,Text, AsyncStorage} from 'react-native'
import { connect } from 'react-redux';
import { colors } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

@connect(state=>state)
export default class Drawer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    logout=()=>{
        AsyncStorage.clear()
        this.props.navigation.closeDrawer()
        this.props.dispatch({type:"LOGOUT"})
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{backgroundColor:"rgba(0,0,0,1)",flex:1}}>
                <SafeAreaView style={{}}>
                    {this.props.isLoggedIn&&
                    <TouchableOpacity onPress={this.logout} style={{width:"100%",padding:10,paddingVertical:20,backgroundColor:"rgba(255,255,255,0.1)"}}>
                        <Text style={{color:colors.textDark}}>Log Out</Text>
                    </TouchableOpacity>
                    }
                    {!this.props.isLoggedIn&&
                    <>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.closeDrawer()
                            this.props.navigation.navigate("Signup")
                            }} style={{width:"100%",padding:10,paddingVertical:20,backgroundColor:"rgba(255,255,255,0.1)"}}>
                            <Text style={{color:colors.textDark}}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.closeDrawer()
                            this.props.navigation.navigate("Login")
                            }} style={{width:"100%",padding:10,paddingVertical:20,backgroundColor:"rgba(255,255,255,0.1)"}}>
                            <Text style={{color:colors.textDark}}>Log In</Text>
                        </TouchableOpacity>

                    </>
                    }
                </SafeAreaView>
            </ScrollView>
        )
    }
}
