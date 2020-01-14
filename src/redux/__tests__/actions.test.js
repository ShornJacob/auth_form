//https://redux.js.org/recipes/writing-tests/
import {loginSuccess,logoutSuccess} from '../actions'
import {LOGIN_SUCCESS,LOGOUT_SUCCESS} from '../actionTypes'


describe('actions', () => {
    it('should create an action loginSuccess', () => {
      const email = 'test@user.com'
      const expectedAction = {
        type: LOGIN_SUCCESS,
        payload : {
            email
        }
      }
      expect(loginSuccess(email)).toEqual(expectedAction)
    })
  })