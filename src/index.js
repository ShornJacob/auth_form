import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify'
import App from './auth';
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'));

