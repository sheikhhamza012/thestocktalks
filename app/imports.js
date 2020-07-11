import {connect} from 'react-redux'
import splash from './splash'
import login from './components/login'
import signup from './components/signup'
import Home from './components/home'
export default {
    splash:connect((state)=>state)(splash),
    login:connect((state)=>state.login)(login),
    signup:connect((state)=>state.signup)(signup),
    home:connect((state)=>state)(Home),
}
