import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView,AsyncStorage,TouchableOpacity,ActivityIndicator} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Field  from '../reuseableComponents/field';
import Button  from '../reuseableComponents/button';
import {colors,api}  from '../constants';
import {axios} from '../reuseableComponents/externalFunctions'
import Toast from 'react-native-easy-toast';

class App extends Component {
    state = { 
        isLoading:false,
        sendingCode:false,
        verifyCode:false,
        email:true,
        code:false,
        password:false,
        form:{email:"",code:"",password:"",cpassword:""}
    }

    askCode=async()=>{
        if(this.state.form.email.length<="0"||!(/\S+@\S+\.\S+/.test(this.state.form.email))){
            this.refs.toast.show("Email not valid")
            return
        }
        this.setState({isLoading:true,sendingCode:true})

        axios('post',api.requestCode,{email:this.state.form.email}).then(async ({data})=>{
            this.setState({isLoading:false,sendingCode:false})
            if(data.error){
                this.refs.toast.show(data.msg);
                return
            }
            this.refs.toast.show(data.msg);
            this.setState({...this.state,email:false,code:true,})
        }).catch(e=>{
            this.setState({isLoading:false,sendingCode:false})
            this.refs.toast.show(e.message)
            }
        )
    }
    verifyCode=async()=>{
        if(this.state.form.code.length<4||this.state.form.code.length>4){
            this.refs.toast.show("Reset code is invalid")
            return
        }
        this.setState({verifyCode:true})
        axios('post',api.verifyCode,{email:this.state.form.email,code:this.state.form.code}).then(async ({data})=>{
            this.setState({verifyCode:false})
            if(data.error){
                this.refs.toast.show(data.msg);
                return
            }
            this.refs.toast.show(data.msg);
            this.setState({...this.state,email:false,code:false,password:true})
        }).catch(e=>{
            this.setState({verifyCode:false})
            this.refs.toast.show(e.message)
            }
        )
    }
    updatePass=async()=>{
        if(this.state.form.password.length<4){
            this.refs.toast.show("Password should atleast be 4 characters long")
            return
        }
        if(this.state.form.password!=this.state.form.cpassword){
            this.refs.toast.show("Password does not match")
            return
        }
        this.setState({isLoading:true})
        axios('post',api.updatePass,{email:this.state.form.email,password:this.state.form.password}).then(async ({data})=>{
            this.setState({isLoading:false})
            if(data.error){
                this.refs.toast.show(data.msg);
                return
            }
            this.refs.toast.show(data.msg);
            this.setState({ 
                isLoading:false,
                sendingCode:false,
                verifyCode:false,
                email:true,
                code:false,
                password:false,
                form:{email:"",code:"",password:"",cpassword:""}
            })
            this.props.navigation.navigate("Login")
        }).catch(e=>{
            this.setState({isLoading:false})
            this.refs.toast.show(e.message)
            }
        )
    }
    handleInput=x=>{
        this.setState({form:{...this.state.form,[x.name]:x.val}})
    }
    render() { 
        return (
            <>
            <Toast
                    ref="toast"
                    position='bottom'
                    positionValue={200}
                />  
            <ScrollView style={styles.root} contentContainerStyle={{alignItems:"stretch"}}>
                <Text style={{fontSize:24,color:colors.textDark}}>
                    Forgot your password?
                </Text>  

                <View style={{height:30}}/>
                    {this.state.email&&
                        <Field  labelText={"Email"}
                            handleInput={this.handleInput}
                            name="email"
                            autoCapitalise={"none"}
                            value={this.state.form.email}
                        />
                    }
                    {this.state.code&&
                    <>
                        <Field  labelText={"Code"}
                            handleInput={this.handleInput}
                            name="code"
                            autoCapitalise={"none"}
                            keyboardType="numeric"
                            value={this.state.form.code}

                        />
                        {this.state.sendingCode?

                            <ActivityIndicator style={{marginTop:20,alignSelf:"flex-start"}}/>
                        :
                            <Text onPress={this.askCode} style={{color:colors.textLight,textDecorationLine:"underline",marginTop:20}}>Resend email</Text>
                        }
                    </>
                    }
                    {this.state.password&&
                    <>
                        <Field  labelText={"Password"}
                            handleInput={this.handleInput}
                            refs={r=>this.password=r}
                            name="password"
                            autoCapitalise={"none"}
                            value={this.state.form.password}
                            password={true}
                        />
                        <View style={{height:20}}/>
                        <Field  labelText={"Confirm Password"}
                            handleInput={this.handleInput}
                            refs={r=>this.cpassword=r}
                            name="cpassword"
                            autoCapitalise={"none"}
                            value={this.state.form.cpassword}
                            password={true}

                        />
                    </>
                    }
                    <View style={{height:40}}/>

                   

                <View style={{height:20}}/>

                <Button isLoading={this.state.code?this.state.verifyCode:this.state.isLoading} onPress={()=>{
                        if(this.state.email){
                            this.askCode()
                        }
                        if(this.state.code){
                            this.verifyCode()
                        }
                        if(this.state.password){
                            this.updatePass()
                        }
                    }} text={this.state.password?"Confirm":"Next"} style={{alignSelf:"center",height:45}}/>
                
                <View style={{height:40}}/>
                <Text onPress={()=>{
                    this.setState({ 
                        isLoading:false,
                        email:true,
                        code:false,
                        password:false,
                        form:{}
                    })
                    this.props.navigation.navigate("Login")
                    }} style={{color:colors.textLight,textAlign:"center",textDecorationLine:"underline"}}>Go back to <Text style={{color:colors.textDark}}>Log in</Text></Text>
                <View style={{height:40}}/>
                
                
            </ScrollView>
        </>
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