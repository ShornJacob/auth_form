//https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
//https://aws-amplify.github.io/amplify-js/api/interfaces/signupparams.html

import {Auth}  from "aws-amplify";

 export async function signUp({username, password}, updateFormType) {
     console.log(username)
     console.log(password)
    try {
      await Auth.signUp({
        username, password
      })

      console.log('sign up success!')
      updateFormType('confirmSignUp')

    } catch (err) {
      console.log('error signing up..', err)
    }
  }