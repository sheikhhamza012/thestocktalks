import React, { Component } from 'react';
import { View,AsyncStorage,KeyboardAvoidingView,TouchableOpacity,TextInput,TouchableHighlight,Dimensions,Image ,StyleSheet,ScrollView, ColorPropType, ActivityIndicator, Platform} from 'react-native';
import Text  from '../reuseableComponents/Text';
import Button  from '../reuseableComponents/button';
import {AntDesign as Icon} from '@expo/vector-icons'
import {Ionicons as Ionicon} from '@expo/vector-icons'

import {colors, api}  from '../constants';
import {LineChart} from 'react-native-chart-kit'
import { axios } from '../reuseableComponents/externalFunctions';
import Toast from 'react-native-easy-toast';
import moment from 'moment'

class App extends Component {
    state = {  commentFieldContainer:false,comment:"",isCommenting:false}
    convertTime=(time)=>{
        return moment(time).fromNow()
    }
    openStock=(sym)=>{
        this.setState({isLoading:true})
        axios('get',api.getStock+sym).then(({data})=>{
            this.setState({isLoading:false})
            if(data.error){
                this.refs.toast.show(data.msg)
                return
            }
            this.props.dispatch({type:"SET_STOCK",data:data.obj})
            this.props.dispatch({type:"STOP_SEARCHING"})
        }).catch(e=>{
            this.setState({isLoading:false})
            this.refs.toast.show(e.message)
        })
    }
    addComment=()=>{
        this.setState({isCommenting:true})
        if(this.state.comment.length<=0){
            this.setState({isCommenting:false})
            this.refs.toast.show("Please write a comment")
            return
        }
        axios('post',api.postComment,{symbol:this.props.home.stock.stocksymbol,comment:this.state.comment}).then(({data})=>{
            this.setState({isCommenting:false})
            if(data.error){
                this.refs.toast.show(data.msg)
                return
            }
            this.setState({commentFieldContainer:false,comment:""})

            this.props.dispatch({type:"ADD_COMMENT",data:data.comment})
        }).catch(e=>{
            this.setState({isLoading:false})
            this.refs.toast.show(e.message)
        })
    }
    componentDidMount=()=>{
        this.openStock("TSLA")
    }
    render() { 
        const {home} = this.props
        return (
            <View style={{backgroundColor:colors.primaryBackground,flex:1}}>
                <Toast
                        ref="toast"
                        position='bottom'
                        positionValue={200}
                    />  
                <ScrollView style={styles.root} contentContainerStyle={{flexGrow:1}}>
                    <Field {...this.props} text="Type to search here" type="search"/>
                    {!this.props.isSearching&&
                        <>
                        {  !this.props.home.stock?
                            <View style={{justifyContent:"center",flexDirection:"row",alignItems:"center",flex:1,backgroundColor:colors.primaryBackground}}>
                                {/* <Icon name="search1" color={colors.textLight} size={42}/> */}
                                <ActivityIndicator />
                                {/* <Text style={{color:colors.textLight,fontSize:22, marginLeft:10}}>Search</Text> */}
                            </View>  
                                :
                            <>
                                <View style={{height:15}}/>
                                <Text style={{fontSize:18,color:colors.textDark}}>
                                    {home.stock.stockdescription}
                                </Text>  
                                <Text style={{fontSize:16,color:colors.textLight}}>
                                    {home.stock.stocksymbol}
                                </Text>  
                                <View style={{paddingVertical:20,justifyContent:"center"}}>
                                        <Text style={{fontSize:42,color:colors.textDark}}>
                                            {home.stock.price}
                                        </Text> 
                                        <Text style={{fontSize:16,color:home.stock.regularMarketChange<0?colors.red:colors.green}}>
                                            ${home.stock.regularMarketChange.split('-').pop()+"  ("+home.stock.regularMarketChangePercent.split('-').pop()+") "} 
                                            <Text style={{color:colors.textDark}}> Today</Text>
                                        </Text> 
                                        <Text style={{fontSize:16,color:home.stock.postMarketChange<0?colors.red:colors.green}}>
                                            ${home.stock.postMarketChange.split('-').pop()+"  ("+home.stock.postMarketChangePercent.split('-').pop()+") "} 
                                            <Text style={{color:colors.textDark}}> After-Hours </Text>
                                        </Text> 
                                </View>


                                <View>
                                    <Text style={{color:colors.textDark,fontSize:28,marginBottom:10}}>Stats </Text>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>Open</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.regularMarketOpen?home.stock.regularMarketOpen:"-"}</Text>
                                        </View>
                                        <View style={{width:15}}/>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>Volume</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.regularMarketVolume?home.stock.regularMarketVolume:"-"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>High</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.regularMarketDayHigh?home.stock.regularMarketDayHigh:"-"}</Text>
                                        </View>
                                        <View style={{width:15}}/>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>Avg Vol</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.averageDailyVolume10Day?home.stock.averageDailyVolume10Day:"-"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>Low</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.regularMarketDayLow?home.stock.regularMarketDayLow:"-"}</Text>
                                        </View>
                                        <View style={{width:15}}/>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>Mkt Cap</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.marketCap?home.stock.marketCap:"-"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>52 Wk High</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.fiftyTwoWeekHigh?home.stock.fiftyTwoWeekHigh:"-"}</Text>
                                        </View>
                                        <View style={{width:15}}/>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>#Employees</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.fullTimeEmployees?home.stock.fullTimeEmployees:"-"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>52 Wk Low</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.fiftyTwoWeekLow?home.stock.fiftyTwoWeekLow:"-"}</Text>
                                        </View>
                                        <View style={{width:15}}/>
                                        <View style={styles.tableRow}>
                                            <Text style={{color:colors.textLight}}>Div/Yield</Text>
                                            <Text style={{color:colors.textDark}}>{home.stock.dividendYield?home.stock.dividendYield:"-"}</Text>
                                        </View>
                                    </View>
                                </View>
{/* 
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
                                </View> */}

                                <View style={{height:30}} />

                                <View style={{flexDirection:"row"}}>
                                    <View style={{flex:1,height:1,backgroundColor:colors.textLight,marginTop:10}}></View>
                                    <Text style={{color:colors.textDark,paddingHorizontal:10,textAlign:"center",fontSize:16}}>  Discussion  </Text>
                                    <View style={{flex:1,height:1,backgroundColor:colors.textLight,marginTop:10,}}></View>
                                </View>

                                <View style={{marginBottom:50}}>
                                {this.props.home.stock.comments.map((x,i)=>
                                    <Comment key={i} onReplyPress={()=>this.setState({commentFieldContainer:!this.state.commentFieldContainer})} data={{name:`${x.user.firstname} ${x.user.lastname}`,designation:x.user.email,time:this.convertTime(x.createdat),comment:x.comment,picture:x.user.pictureurl}}/>
                                )}
                                </View>
                            </>
                            }
                            </>
                        }
                    <View style={{height:50}}/>

                </ScrollView>
                {this.props.home.stock&& 
                    <>
                        {
                            !this.state.commentFieldContainer?
                            <TouchableOpacity onPress={()=>this.setState({commentFieldContainer:!this.state.commentFieldContainer})} style={styles.stickyButton}>
                                <Icon name="message1" color={colors.textDark} size={32}/>
                            </TouchableOpacity>
                            :
                            <KeyboardAvoidingView behavior = {Platform.OS=="ios"?"padding":"height"} keyboardVerticalOffset = {80}  style={styles.commentModal}>
                                <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>this.setState({commentFieldContainer:!this.state.commentFieldContainer})} >
                                    <View style={styles.commentModalCloseBar}/>
                                </TouchableOpacity>
                                <Field type="comment" isLoading={this.state.isCommenting} handleInput={t=>this.setState({comment:t})} value={this.state.comment} onSubmitEditing={this.addComment}  text="type here to disuss about traiding"/>
                            </KeyboardAvoidingView>
                        }
                    </>
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
    tableRow:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
         paddingVertical:10,
         borderBottomWidth:.5,
        borderColor:colors.textLight
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
        console.log(data)
        return (

            <View style={styles.commentContainer}>
                <Image style={styles.avatar} source={{uri:data.picture?data.picture:""}}/>
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
                        <Text onPress={this.props.onReplyPress} style={{fontSize:14,color:colors.textDark,marginBottom:5}}>
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
            isLoading:false,
            query:""
        }
        this.typingTimeout= 0
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
    input=t=>{
        this.setState({query:t})
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
         }
        this.typingTimeout=setTimeout(() =>{
            this.search(t);
        }, 1500)
    }
    search=(t)=>{
        clearTimeout(this.typingTimeout);
        this.setState({isLoading:true})
        axios('post',api.getSymbols,{search:t}).then(({data})=>{
            this.setState({isLoading:false})
            if(data.error){
                this.refs.toast.show(data.msg)
                return
            }
            this.props.dispatch({type:"SET_SYMBOLS",data:data.symbols})
        }).catch(e=>{
            this.setState({isLoading:false})
            this.refs.toast.show(e.message)
        })
    }
    openStock=(sym)=>{
        this.setState({isLoading:true})
        axios('get',api.getStock+sym).then(({data})=>{
            this.setState({isLoading:false})
            if(data.error){
                this.refs.toast.show(data.msg)
                return
            }
            this.props.dispatch({type:"SET_STOCK",data:data.obj})
            this.props.dispatch({type:"STOP_SEARCHING"})
        }).catch(e=>{
            this.setState({isLoading:false})
            this.refs.toast.show(e.message)
        })
    }
    render() {
        return (
            <>
                <View style={{flexDirection:"row"}}>

                    <View style={[this.containerStyle(),{flexDirection:"row",flex:1,alignItems:"center"}]}>
                        <TextInput 
                            onFocus={this.props.type=="comment"?undefined:()=>this.props.dispatch({type:"START_SEARCHING"})}
                            onChangeText={this.props.type=="comment"?t=>this.props.handleInput(t):t=>this.input(t)}
                            style={[styles.inputField,this.props.type=="comment"?{color:colors.textLight}:{}]}
                            selectionColor={colors.textLight}
                            placeholderTextColor={colors.textLight}
                            placeholder={this.props.text}
                            onSubmitEditing={this.props.type=="comment"?this.props.onSubmitEditing:()=>this.search(this.state.query)}
                            value={this.props.type=="comment"?this.props.value:this.state.query}
                        />
                        {this.props.type=="comment"?
                            <>
                                {this.props.isLoading?
                                    <ActivityIndicator color={colors.yellow}/>
                                    :
                                    <TouchableOpacity onPress={this.props.onSubmitEditing}>
                                        <Ionicon name="ios-send" color={this.iconColor()} size={24}/>
                                    </TouchableOpacity>
                                }
                            </>
                        :
                        <TouchableOpacity onPress={()=>this.search(this.state.query)}>
                                <Icon name="search1"  color={this.iconColor()} size={16}/>
                        </TouchableOpacity>
                        }
                    </View>
                    {
                        this.props.isSearching&&
                        <TouchableOpacity style={{justifyContent:"center"}} onPress={()=>this.props.dispatch({type:"STOP_SEARCHING"})}>
                            <Text style={{color:colors.textDark, fontSize:16,marginLeft:10}}>Cancel</Text>
                        </TouchableOpacity>
                    }
                </View>
                {this.props.isSearching&&
                    <View style={{flex:1}}>
                        <Text style={{color:colors.textDark,marginVertical:20,fontSize:18}}>Search Stocks</Text>
                        {this.state.isLoading?
                            <ActivityIndicator />
                            :
                            <View>
                                {
                                    this.props.symbols.map(x=>
                                    <TouchableOpacity onPress={()=>this.openStock(x.symbol)} style={{borderColor:colors.textLight,paddingBottom:10,marginBottom:10,borderBottomWidth:1}}>
                                        <Text style={{color:colors.textDark,marginVertical:5,fontSize:16}}>{x.stockdescription}</Text>
                                        <Text style={{color:colors.textLight,marginVertical:5,fontSize:16}}>{x.symbol}</Text>

                                    </TouchableOpacity>
                                    )
                                }
                            </View> 
                        }
                    </View>
                }
            </>
        )
    }
}

export default App

