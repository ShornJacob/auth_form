import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify'
import App from './auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
    <React.Fragment>
         <CssBaseline />
        <App />
    </React.Fragment>

, document.getElementById('root'));

