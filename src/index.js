import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify'
import AppRouter from 'auth/appWithRouter';
import CssBaseline from '@material-ui/core/CssBaseline';
import config from './aws-exports'
import { Provider } from 'react-redux';
import store from 'redux//reducers';
Amplify.configure(config)

ReactDOM.render(
    <React.Fragment>
         <CssBaseline />
         <Provider store={store}>
         <AppRouter />
         </Provider>

    </React.Fragment>

, document.getElementById('root'));

