//https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
//https://aws-amplify.github.io/amplify-js/api/interfaces/signupparams.html

import {Auth}  from "aws-amplify";

 export async function signUp({username, password}, updateFormType) {
    //  console.log(username)
    //  console.log(password)
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

  export async function confirmSignUp({ username, confirmationCode }, updateFormType) {
    try {
      await Auth.confirmSignUp(username, confirmationCode)
      console.log('confirm sign up success!')
      updateFormType('signIn')
    } catch (err) {
      console.log('error confirming signing up..', err)
    }
  }

  export async function signIn({ username, password }) {
    try {
      await Auth.signIn(username, password)
      console.log('sign in success!')
    } catch (err) {
      console.log('error signing up..', err)
    }
  }