import React, { useState } from "react";
import {isLoggedIn, logout} from './util'
import SignIn from "./SignIn";
import  User from './User'
import SimpleSnackbar from '../components/Snackbar'




export default () => {

  const initialFormType =  isLoggedIn() ? 'loggedIn' : "signIn"

  const [formType, updateFormType] = useState(initialFormType);
  const [serverError, updateServerError] = useState(null);


//   console.log(formType)
//   console.log(isLoggedIn())

  function renderAuth() {
    switch (formType) {
        case "signIn":
            return (
              <SignIn updateFormType={updateFormType} updateServerError={updateServerError} />
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
         {serverError ? <SimpleSnackbar message={serverError} /> : null}
      </div>
  )
};
