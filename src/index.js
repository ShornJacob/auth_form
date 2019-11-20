import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify'
import App from './auth';
import App2 from './App2';
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(<App2 />, document.getElementById('root'));

