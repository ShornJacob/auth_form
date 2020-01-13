//https://github.com/ShornJacob/Auth_ReduxForm/blob/master/src/auth/reducers/index.js
import {isLoggedIn,getUser} from 'services/auth.js'

const initialState = {
    AUTHENTICATED: isLoggedIn(),
    AUTHENTICATING: false,
    email: isLoggedIn() ? getUser().username : null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return ({
                AUTHENTICATED: true,
                AUTHENTICATING: false,
                email: action.payload.email,
            })

        case 'LOGOUT_SUCCESS':
            return ({
                AUTHENTICATED: false,
                AUTHENTICATING: false,
                email: null,
            })


        default:
            return state
    }
}