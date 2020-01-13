//https://github.com/ShornJacob/Auth_ReduxForm/blob/master/src/auth/containers/index.js
import SimpleAppBar from '../components/SimpleAppBar'
import {logoutSuccess} from "redux/actions"
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    authenticated : state.auth.AUTHENTICATED,
    authenticating : state.auth.AUTHENTICATING,
    email : state.auth.email
})

//second arg for mapdisptach to props
const connectedAppBar =  connect(mapStateToProps, {logoutSuccess})(SimpleAppBar)

export default connectedAppBar