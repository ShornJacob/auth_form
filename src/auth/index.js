import React, { useState, useReducer } from "react";
import {isLoggedIn, logout} from './util'
import SignIn from "./SignIn";
import {  signIn} from "./amplify";
import  User from './User'

const initialFormState = {
    username: "",
    password: ""
  };


function reducer(state, action) {
    switch (action.type) {
      case "updateFormState":
        return {
          ...state,
          [action.e.target.name]: action.e.target.value
        };
      default:
        return state;
    }
  }


export default () => {

  const initialFormType =  isLoggedIn() ? 'loggedIn' : "signIn"

  const [formType, updateFormType] = useState(initialFormType);
  const [formState, updateFormState] = useReducer(reducer, initialFormState);

//   console.log(formType)
//   console.log(isLoggedIn())

  function renderAuth() {
    switch (formType) {
        case "signIn":
            return (
              <SignIn
                signIn={() => signIn(formState,updateFormType)}
                updateFormState={e =>
                  updateFormState({ type: "updateFormState", e })
                }
              />
            );
            case "loggedIn":
                return (
                    //logout takes a callback to execute 
                  <User logout={ () => logout(() => updateFormType('signIn'))} />
                );
      default:
        return null;
    }
  }



  return (
      <div>
         { renderAuth() }
      </div>
  )
};
