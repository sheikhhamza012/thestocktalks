import {connect} from 'react-redux'
import splash from './splash'
import login from './components/login'
export default {
    splash:connect((state)=>state)(splash),
    login:connect((state)=>state.login)(login),
}
