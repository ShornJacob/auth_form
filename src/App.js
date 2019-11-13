//https://dev.to/dabit3/the-complete-guide-to-user-authentication-with-the-amplify-framework-2inh
//https://github.com/dabit3/amplify-auth-demo/blob/master/src/Form.js

import React, { useState, useReducer } from 'react'
import SignUp from './SignUp'
import {signUp} from './amplify'

const initialFormState = {
  email: '', password: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'updateFormState':
      return {
        ...state, [action.e.target.name]: action.e.target.value
      }
    default:
      return state
  }
}


export default function App() {
  
  //hooks can be only inside functional component
  const [formType, updateFormType] = useState('signUp')
  const [formState, updateFormState] = useReducer(reducer, initialFormState)
 
  //switches  based on state
  function renderForm() {
    switch(formType) {

      //updateFormState prop now has additonal data from the event by being passed and used in child component
      //stage changers are passed through child components
      case 'signUp':
        return (
            <SignUp signUp={ () => signUp(formState, updateFormType)}
            updateFormState={ e => updateFormState({type: 'updateFormState', e})}
            />
        )
        default :
        return null
    }
  }

  console.log(formType)
  console.log(formState)

   return (
     <div>
       {renderForm()}
     </div>
   )
    
  }

  
