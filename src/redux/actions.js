import {LOGIN_SUCCESS,LOGOUT_SUCCESS} from './actionTypes'

export const loginSuccess = (email) => {
    return {
        type : LOGIN_SUCCESS,
        payload : {
            email,
        }
    }
}

export const logoutSuccess = () => ({type : LOGOUT_SUCCESS})