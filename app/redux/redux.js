
import {createStore} from 'redux'

const initialState={
    isLoggedIn:true,
    login:{
        
    },
    signup:{
        
    },
    home:{
        stock:{
            stockName:"Axis Bank",
            company  :"Axis Bank",
            price:22,
            up:12,
            down:11
        }
    }
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
        default: 
            return state; 
    }    
}
export const store= createStore(rootReducer,initialState)
export const state={initialState}