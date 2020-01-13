//https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object
import {loginSuccess} from "redux/actions"
import { connect } from 'react-redux'
import SignIn from '../components/SignIn'

export default connect(null, {loginSuccess})(SignIn);