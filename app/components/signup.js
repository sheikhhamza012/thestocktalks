import React, { Component } from 'react';
import { View ,StyleSheet,ScrollView, ImageBackground} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Field  from '../reuseableComponents/field';
import Button  from '../reuseableComponents/button';
import {colors}  from '../constants';
import {Feather as Icon} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

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
            pictureUrl:null,
            gender:"m",
        },
        pic:{}
    }
    uploadPic=(pic)=>{
        console.log(pic)
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
        this.setState({form:{[x.name]:x.val}})
    }
    submit=()=>{

    }
    render() { 
        return (
            // <ScrollView style={styles.root} contentContainerStyle={{flexGrow:1}}>
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
                />
                <View style={{height:40}}/>
                <Field  labelText={"Last name"}
                        handleInput={this.handleInput}
                        refs={r=>this.lname=r}
                        name='lname'
                        next={()=>this.email}

                />
                <View style={{height:40}}/>
                <Field  labelText={"Email"}
                        handleInput={this.handleInput}
                        refs={r=>this.email=r}
                        name='email'
                        next={()=>this.password}

                />
                <View style={{height:40}}/>
                <Field  labelText={"Password"}
                        password={true}
                        handleInput={this.handleInput}
                        refs={r=>this.password=r}
                        name='password'
                        next={()=>this.confirmPassword}

                />
                <View style={{height:40}}/>
                <Field  labelText={"Confirm password"}
                        password={true}
                        handleInput={this.handleInput}
                        refs={r=>this.confirmPassword=r}
                        name='confirmPassword'
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
                
                <Button text="Sign Up" onPress={()=>{
                    this.lname.focus()
                }} style={{alignSelf:"center",height:45}}/>
                <View style={{height:20}}/>
                <Text onPress={()=>this.props.navigation.navigate("Login")} style={{color:colors.textLight,textAlign:"center",textDecorationLine:"underline"}}>I already have an account? <Text style={{color:colors.textDark}}>Log in</Text></Text>
                <View style={{height:100}}/>
                </KeyboardAvoidingScrollView>
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