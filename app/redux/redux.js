
import {createStore} from 'redux'

const initialState={
    login:{
        
    }
 }

rootReducer=(istate,action)=>{
    var state = JSON.parse(JSON.stringify(istate))
    switch(action.type){
        
        default: 
            return state; 
    }    
}
export const store= createStore(rootReducer,initialState)
export const state={initialState}