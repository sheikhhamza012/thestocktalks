import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView, ImageBackground, AsyncStorage} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Field  from '../reuseableComponents/field';
import Button  from '../reuseableComponents/button';
import {colors,api}  from '../constants';
import {Feather as Icon} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Toast from 'react-native-easy-toast';
import {axios} from '../reuseableComponents/externalFunctions'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAKz2wrTeLW3WtDKGi1PuFjoeptMJmIPWo',
    storageBucket: 'gs://thestocktalk-6feb3.appspot.com',
    projectId: "thestocktalk-6feb3",     
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyAKz2wrTeLW3WtDKGi1PuFjoeptMJmIPWo',
        storageBucket: 'thestocktalk-6feb3.appspot.com',
        projectId: "thestocktalk-6feb3",     
    });
}
console.disableYellowBox=true
class App extends Component {
    state = { 
        form:{
            fname:"",
            lname:"",
            password:"",
            confirmPassword:"",
            email:"",
            pictureUrl:"",
            gender:"m",
        },
        errors:{
            fname:null,
            lname:null,
            password:null,
            confirmPassword:null,
            email:null,
        },
        pic:{},
        isLoading:false
    }
    uploadPic=async(pic)=>{
        this.setState({isLoading:true})
        const filename = pic.uri.split('/').pop();
        const response = await fetch(pic.uri);
        const blob = await response.blob();
        var ref =  await firebase
            .storage()
            .ref(`${filename}`)
        var uploded= await ref.put(blob)
        var url= await ref.getDownloadURL()
        this.setState({isLoading:false,form:{...this.state.form,pictureUrl:url}})
    }
    _pickImage = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('You need to grant gallery permission by going in to the settings');
                return
            }
        }
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ pic: result },()=>this.uploadPic(result));
                
            }
        } catch (E) {
            console.log(E);
        }
    }
    handleInput=x=>{
        this.setState({form:{...this.state.form,[x.name]:x.val},errors:{...this.state.errors,[x.name]:null}})
    }
    reportError=(msg)=>{
        console.log(msg)
        if(msg.includes("firstName")){
            let str=msg.split("\"")
            this.setState({errors:{...this.state.error,fname:"Field"+str[str.length-1]}})
        }else if(msg.includes("lastName")){
            let str=msg.split("\"")
            this.setState({errors:{...this.state.error,lname:"Field"+str[str.length-1]}})
        }else if(msg.includes("email")){
            let str=msg.split("\"")
            this.setState({errors:{...this.state.error,email:"Field"+str[str.length-1]}})
        }else if(msg.includes("password")&&!msg.includes("confirmPassword")){
            let str=msg.split("\"")
            this.setState({errors:{...this.state.error,password:"Field "+str[str.length-1]}})
        }else if(msg.includes("confirmPassword")){
            let str=msg.split("\"")
            this.setState({errors:{...this.state.error,confirmPassword:"Password does not match"}})
        }
    }
    submit=async()=>{
        this.setState({isLoading:true})
        const{form} = this.state
        const{fname,lname,email,password,confirmPassword,gender,pictureUrl} = form
        if(!(fname.length>0&&lname.length>0&&email.length>0&&confirmPassword.length>0&&gender.length>0&&password.length>0)){
            for(var key in form){   
                if(form[key].length<=0){
                    await this.setState({errors:{...this.state.errors, [key]:"Please fill this field"}})
                }
            }
            this.setState({isLoading:false})
            return
        }
        axios('post',api.register,form).then(async ({data})=>{
            this.setState({isLoading:false})
            if(data.error){
                console.log(data)
                this.reportError(data.msg);
                return
            }
            this.setState({
                form:{
                    fname:"",
                    lname:"",
                    password:"",
                    confirmPassword:"",
                    email:"",
                    pictureUrl:"",
                    gender:"m",
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
    render() { 

        return (
            // <ScrollView style={styles.root} contentContainerStyle={{flexGrow:1}}>
            <>
                    <Toast
                        ref="toast"
                        position='bottom'
                        positionValue={200}
                    />               
                    <KeyboardAvoidingScrollView  style={styles.root} contentContainerStyle={{flexGrow:1}}>
                    <Text style={{fontSize:24,color:colors.textDark}}>
                        Join Us!
                    </Text>  
                    <TouchableOpacity onPress={this._pickImage} style={styles.profilePic}>
                        <ImageBackground source={{uri: this.state.pic.uri}} style={{width:120,height:120,justifyContent:"center",alignItems:"center"}}>
                            <Icon name="plus-circle" size={42} color={colors.textDark}/>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={{height:30}}/>
                    <Field  labelText={"First name"}
                            handleInput={this.handleInput}
                            refs={r=>this.fname=r}
                            name='fname'
                            next={()=>this.lname}
                            errorMsg={this.state.errors.fname}
                            value={this.state.form.fname}
                    />
                    <View style={{height:40}}/>
                    <Field  labelText={"Last name"}
                            handleInput={this.handleInput}
                            refs={r=>this.lname=r}
                            name='lname'
                            next={()=>this.email}
                            errorMsg={this.state.errors.lname}
                            value={this.state.form.lname}

                    />
                    <View style={{height:40}}/>
                    <Field  labelText={"Email"}
                            handleInput={this.handleInput}
                            refs={r=>this.email=r}
                            name='email'
                            next={()=>this.password}
                            errorMsg={this.state.errors.email}
                            autoCapitalise={"none"}
                            value={this.state.form.email}


                    />
                    <View style={{height:40}}/>
                    <Field  labelText={"Password"}
                            password={true}
                            handleInput={this.handleInput}
                            refs={r=>this.password=r}
                            name='password'
                            next={()=>this.confirmPassword}
                            errorMsg={this.state.errors.password}
                            value={this.state.form.password}


                    />
                    <View style={{height:40}}/>
                    <Field  labelText={"Confirm password"}
                            password={true}
                            handleInput={this.handleInput}
                            refs={r=>this.confirmPassword=r}
                            name='confirmPassword'
                            errorMsg={this.state.errors.confirmPassword}
                            value={this.state.form.confirmPassword}


                    />
                    <View style={{height:40}}/>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"space-around"}}>

                        <TouchableOpacity onPress={()=>this.setState({form:{gender:"m"}})} style={[styles.radio,this.state.form.gender=="m"?styles.radioSelected:{}]}>
                            <Text style={{fontSize:18,color:this.state.form.gender=="m"?colors.primaryBackground:colors.textDark}}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({form:{gender:"f"}})}  style={[styles.radio,this.state.form.gender=="f"?styles.radioSelected:{}]}>
                            <Text style={{fontSize:18,color:this.state.form.gender=="f"?colors.primaryBackground:colors.textDark}}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{height:50}}/>
                    
                    <Button isLoading={this.state.isLoading} text="Sign Up" onPress={this.submit} style={{alignSelf:"center",height:45}}/>
                    <View style={{height:20}}/>
                    <Text onPress={()=>this.props.navigation.navigate("Login")} style={{color:colors.textLight,textAlign:"center",textDecorationLine:"underline"}}>I already have an account? <Text style={{color:colors.textDark}}>Log in</Text></Text>
                    <View style={{height:100}}/>
                </KeyboardAvoidingScrollView>
            </>
            // </ScrollView>
        )}
}
const styles=StyleSheet.create({
    root:{
        
        // flexGrow:1,
        backgroundColor:colors.primaryBackground,
        padding:15
    },
    radioSelected:{
        backgroundColor:colors.yellow,
        borderColor:colors.textLight
    },
    profilePic:{
        padding:10,
        marginVertical:10,
        marginTop:20,
        borderColor:colors.textDark,
        borderRadius:5,
        borderWidth:2,
        borderStyle:"dashed",
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center"
    },
    radio:{
        padding:15,
        borderColor:colors.textDark,
        borderRadius:5,
        borderWidth:2,
        borderStyle:"dashed",
        alignSelf:"center",
        width:130
    }

})
export default App;