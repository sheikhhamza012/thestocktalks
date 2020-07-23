
import {createStore} from 'redux'

const initialState={
    isLoggedIn:false,
    isSearching:false,
    home:{
        stock:null
    },
    symbols:[
       
    ]
 }

rootReducer=(istate,action)=>{
    var state = JSON.parse(JSON.stringify(istate))
    switch(action.type){
        case "LOGOUT": 
            state.isLoggedIn=false
            return state
        case "LOGIN": 
            state.isLoggedIn=true
            return state
        case "SET_SYMBOLS": 
            state.symbols=action.data
            return state
        case "START_SEARCHING": 
            state.isSearching=true
            return state
        case "STOP_SEARCHING": 
            state.isSearching=false
            return state
        case "SET_STOCK": 
            state.home.stock=action.data
            return state
        case "ADD_COMMENT": 
            state.home.stock.comments.push(action.data)
            return state
        default: 
            return state; 
    }    
}
export const store= createStore(rootReducer,initialState)
export const state={initialState}