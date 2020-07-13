import React, { Component } from 'react';
import { View,TouchableOpacity,TextInput,TouchableHighlight,Dimensions,Image ,StyleSheet,ScrollView, ColorPropType} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Button  from '../reuseableComponents/button';
import {AntDesign as Icon} from '@expo/vector-icons'
import {Ionicons as Ionicon} from '@expo/vector-icons'

import {colors}  from '../constants';
import {LineChart} from 'react-native-chart-kit'
class App extends Component {
    state = {  commentFieldContainer:false}
    render() { 
        const {home} = this.props
        return (
            <View style={{backgroundColor:colors.primaryBackground,flex:1}}>
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

                <View >
                    <LineChart
                        data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width-40} // from react-native
                        height={200}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor:colors.textLight,
                            fillShadowGradient:colors.yellow,
                            fillShadowGradientOpacity:.7,
                            backgroundGradientFrom: colors.primaryBackground,
                            backgroundGradientTo: colors.primaryBackground,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => colors.yellow,
                            labelColor: (opacity = 1) => colors.textLight,
                            propsForDots: {
                                r: "0"
                            },
                            
                        }}
                        yLabelsOffset={25}
                        style={{marginVertical:10}}
                        segments={4}
                        withInnerLines={!false}
                        withOuterLines={false}
                        withHorizontalLines={true}
                        withVerticalLines={false}
                        withVerticalLabels={false}
                        bezier
                        
                    />
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:-30}}>
                        <View style={[{padding:5,borderRadius:5}]}><Text onPress={()=>alert()} style={{color:colors.textDark,}}>1D</Text></View>
                        <View style={[{padding:5,borderRadius:5}]}><Text style={{color:colors.textDark,}}>3D</Text></View>
                        <View style={[{padding:5,borderRadius:5},styles.selected]}><Text style={{color:colors.primaryBackground}}>7D</Text></View>
                        <View style={[{padding:5,borderRadius:5}]}><Text style={{color:colors.textDark,}}>1M</Text></View>
                        <View style={[{padding:5,borderRadius:5}]}><Text style={{color:colors.textDark,}}>3M</Text></View>
                        <View style={[{padding:5,borderRadius:5}]}><Text style={{color:colors.textDark,}}>6M</Text></View>
                        <View style={[{padding:5,borderRadius:5}]}><Text style={{color:colors.textDark,}}>1Y</Text></View>
                        <View style={[{padding:5,borderRadius:5}]}><Text style={{color:colors.textDark,}}>MAX</Text></View>
                    </View>

                    <View style={{height:30}} />

                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1,height:1,backgroundColor:colors.textLight,marginTop:10}}></View>
                        <Text style={{color:colors.textDark,paddingHorizontal:10,textAlign:"center",fontSize:16}}>  Discussion  </Text>
                        <View style={{flex:1,height:1,backgroundColor:colors.textLight,marginTop:10,}}></View>
                    </View>

                    <View style={{marginBottom:50}}>
                       {[0,0].map((x,i)=>
                        <Comment key={i} data={{name:"Mr. Admin",designation:"Treder",time:"2 mint ago",comment:"asdasdad"}} />
                       )}
                    </View>
                
                </ScrollView>
                {!this.state.commentFieldContainer?
                    <TouchableOpacity onPress={()=>this.setState({commentFieldContainer:!this.state.commentFieldContainer})} style={styles.stickyButton}>
                        <Icon name="message1" color={colors.textDark} size={32}/>
                    </TouchableOpacity>
                    :
                    <View style={styles.commentModal}>
                        <TouchableOpacity onPress={()=>this.setState({commentFieldContainer:!this.state.commentFieldContainer})} style={styles.commentModalCloseBar}/>
                        <Field type="comment" text="type here to disuss about traiding"/>
                    </View>
                }
            </View>
        )}
}
const styles=StyleSheet.create({
    root:{
        
        // flexGrow:1,
        backgroundColor:colors.primaryBackground,
        padding:15,
        paddingTop:5
    },
    commentModalCloseBar:{
        width:30,
        marginVertical:10,
        borderRadius:10,
        height:5,
        backgroundColor:"#666"
    },
    commentModal:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        alignItems:"center",
        padding:10,
        paddingTop:0,
        backgroundColor:colors.textDark
    },
    selected:{
        backgroundColor:colors.yellow,
        borderRadius:5
    },
    commentContainer:{
        backgroundColor:colors.commentBackGround,
        borderRadius:10,
        marginTop:20,
        padding:10,
        flexDirection:"row",
    },
    searchContainer:{
        padding:7,
        paddingHorizontal:15,
        backgroundColor:colors.searchBackground,
        borderRadius:5,
        flexDirection:"row"
    },
    inputField:{
        color:colors.textDark,
        fontSize:16,
        fontFamily:'ABeeZee',
        flex:1
    },
    avatar:{
        backgroundColor:colors.primaryBackground,
        height:50,
        width:50,
        borderRadius:100,
        borderWidth:1,
        borderColor:colors.yellow
    },commentFieldContainer:{
        backgroundColor:"#DBDBDB",
        borderRadius:50,
        padding:7,
        paddingHorizontal:15,
        flexDirection:"row"
    },
    stickyButton:{
        backgroundColor:colors.yellow,
        bottom:20,
        right:20,
        width:60,
        zIndex:1,
        position:"absolute",
        alignItems:"center",
        padding:10,
        borderRadius:10
    }


})

class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        const {data} =this.props
        return (

            <View style={styles.commentContainer}>
                <Image style={styles.avatar}/>
                <View  style={{flex:1,height:"100%",paddingHorizontal:10}}>
                    <Text style={{fontSize:18,color:colors.textDark}}>
                        {data.name}
                    </Text> 
                    <Text style={{fontSize:14,color:colors.textDark,marginBottom:10}}>
                        {data.designation}
                    </Text> 
                    <Text style={{fontSize:14,color:colors.textDark,marginBottom:10}}>
                        {data.comment}    
                    </Text> 
                    <Text style={{fontSize:14,textAlign:"right",color:colors.textDark,marginBottom:5}}>
                        {data.time}{"  "}
                        <Text style={{fontSize:14,color:colors.textDark,marginBottom:5}}>
                            Reply
                        </Text> 
                    </Text> 
                </View>
            </View>
        )
    }
}


class Field extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    containerStyle=()=>{
        switch(this.props.type){
            case "comment":

                return styles.commentFieldContainer
            
            default:
                return styles.searchContainer
        }
    }
    iconColor=()=>{
        switch(this.props.type){
            case "comment":

                return colors.yellow
            
            default:
                return colors.textDark
        }
    }
    render() {
        return (
            <View style={[this.containerStyle(),{flexDirection:"row",alignItems:"center"}]}>
                <TextInput 
                    style={[styles.inputField,this.props.type=="comment"?{color:colors.textLight}:{}]}
                    selectionColor={colors.textLight}
                    placeholderTextColor={colors.textLight}
                    placeholder={this.props.text}
                />
                {this.props.type=="comment"?
                    <TouchableOpacity>
                        <Ionicon name="ios-send" color={this.iconColor()} size={24}/>
                    </TouchableOpacity>
                :
                    <TouchableOpacity>
                        <Icon name="search1" color={this.iconColor()} size={16}/>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default App;