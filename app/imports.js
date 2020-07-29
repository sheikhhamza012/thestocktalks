import {connect} from 'react-redux'
import splash from './splash'
import login from './components/login'
import signup from './components/signup'
import Drawer from './reuseableComponents/drawer'
import Home from './components/home' 
import resetPass from './components/resetPass' 
export default {
    splash:connect((state)=>state)(splash),
    login:connect((state)=>state)(login),
    resetPass:connect((state)=>state)(resetPass),
    signup:connect((state)=>state)(signup),
    home:connect( (state)=>state)(Home),
    Drawer:connect( (state)=>state)(Drawer),
}
