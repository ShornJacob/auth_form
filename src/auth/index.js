import React, { useState } from "react";
import {isLoggedIn, logout} from './util'
import SignIn from "./SignIn";
import  User from './User'




export default () => {

  const initialFormType =  isLoggedIn() ? 'loggedIn' : "signIn"

  const [formType, updateFormType] = useState(initialFormType);


//   console.log(formType)
//   console.log(isLoggedIn())

  function renderAuth() {
    switch (formType) {
        case "signIn":
            return (
              <SignIn updateFormType={updateFormType} />
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
