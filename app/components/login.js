import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView,AsyncStorage} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Field  from '../reuseableComponents/field';
import Button  from '../reuseableComponents/button';
import {colors,api}  from '../constants';
import {axios} from '../reuseableComponents/externalFunctions'

class App extends Component {
    state = { 
        form:{
            email:"",
            password:""
        },
        errors:{
            email:null,
            password:null
        }
    }

    submit=async()=>{
        this.setState({isLoading:true})
        const{form} = this.state
        const{email,password} = form
        if(!(email.length>0&&password.length>0)){
            for(var key in form){   
                if(form[key].length<=0){
                    await this.setState({errors:{...this.state.errors, [key]:"Please fill this field"}})
                }
            }
            this.setState({isLoading:false})
            return
        }if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            await this.setState({isLoading:false,errors:{...this.state.errors, email:"Email is incorrect"}})

        }
        axios('post',api.login,form).then(async ({data})=>{
            this.setState({isLoading:false})
            if(data.error){
                console.log(data)
                await this.setState({errors:{...this.state.errors, password:data.msg}})
                return
            }
            this.setState({
                form:{
                    password:"",
                    email:"",
                },
                isLoading:false
            })
            AsyncStorage.setItem('token',data.token)
            this.props.dispatch({type:'LOGIN'})
        }).catch(e=>{
            this.setState({isLoading:false})
            this.refs.toast.show(e.message)
            }
        )
    }
    handleInput=x=>{
        this.setState({form:{...this.state.form,[x.name]:x.val},errors:{...this.state.errors,[x.name]:null}})
    }
    render() { 
        return (
            <ScrollView style={styles.root} contentContainerStyle={{alignItems:"stretch"}}>
                <Text style={{fontSize:24,color:colors.textDark}}>
                    Welcome Back!
                </Text>  

                <View style={{height:30}}/>
                    <Field  labelText={"Email"}
                            handleInput={this.handleInput}
                            refs={r=>this.email=r}
                            name="email"
                            next={()=>this.password}
                            errorMsg={this.state.errors.email}
                            value={this.state.form.email}
                            autoCapitalise={"none"}
                    />
                    <View style={{height:40}}/>

                    <Field  labelText={"Password"}
                            password={true}
                            handleInput={this.handleInput}
                            refs={r=>this.password=r}
                            name='password'
                            errorMsg={this.state.errors.password}
                            value={this.state.form.password}


                    />
                <View style={{height:20}}/>

                <Text style={{color:colors.textLight,textDecorationLine:"underline"}}>Forgot Password?</Text>
                <View style={{height:20}}/>

                <Button isLoading={this.state.isLoading} onPress={this.submit} text="Log In" style={{alignSelf:"center",height:45}}/>
                <View style={{height:20}}/>

                <Text onPress={()=>this.props.navigation.navigate("Signup")} style={{color:colors.textLight,textAlign:"center",textDecorationLine:"underline"}}>Dont have an account yet? <Text style={{color:colors.textDark}}>Sign Up</Text></Text>
                <View style={{height:40}}/>

                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1,height:2,backgroundColor:colors.textLight,marginTop:10}}></View>
                    <Text style={{color:colors.textLight,paddingHorizontal:10,textAlign:"center",textDecorationLine:"underline"}}>  or login with  </Text>
                    <View style={{flex:1,height:2,backgroundColor:colors.textLight,marginTop:10,}}></View>
                </View>

                <View style={{height:40}}/>
                <View style={{flexDirection:"row"}}>
                    <Button iconLeft="google" text="Google"  type="google" style={{alignSelf:"center",height:45,flex:1}}/>
                    <View style={{width:10}}/>
                    <Button iconLeft="facebook-square" color={colors.textDark} text="Facebook" type="fb" style={{alignSelf:"center",height:45,flex:1}}/>

                </View>
                
            </ScrollView>
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