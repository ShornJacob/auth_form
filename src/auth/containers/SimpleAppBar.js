//https://github.com/ShornJacob/Auth_ReduxForm/blob/master/src/auth/containers/index.js
import SimpleAppBar from '../components/SimpleAppBar'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    authenticated : state.auth.AUTHENTICATED,
    authenticating : state.auth.AUTHENTICATING,
    email : state.auth.email
})

const connectedAppBar =  connect(mapStateToProps)(SimpleAppBar)

export default connectedAppBar