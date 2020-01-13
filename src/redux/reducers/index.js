// https://react-redux.js.org/introduction/basic-tutorial
//https://github.com/ShornJacob/Auth_ReduxForm/blob/master/src/reducers/index.js
import { combineReducers, createStore } from 'redux'
import { authReducer } from 'redux/reducers/auth'

const rootReducer = combineReducers({
    auth : authReducer
  //   other reducers here
  });

  //https://github.com/zalmoxisus/redux-devtools-extension#usage
const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;