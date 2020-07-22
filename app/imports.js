import {connect} from 'react-redux'
import splash from './splash'
import login from './components/login'
import signup from './components/signup'
import Home from './components/home'
import Drawer from './reuseableComponents/drawer'
export default {
    splash:connect((state)=>state)(splash),
    login:connect((state)=>state)(login),
    signup:connect((state)=>state)(signup),
    home:connect( (state)=>state)(Home),
    Drawer:connect( (state)=>state)(Drawer),
}
