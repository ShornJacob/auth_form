//https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
//https://aws-amplify.github.io/amplify-js/api/interfaces/signupparams.html

import {Auth}  from "aws-amplify";
import {setUser} from './util';

 export async function signUp({username, password}, updateSignUpStage,updatesnackbarMsg ) {

    try {
      await Auth.signUp({
        username, password
      })

      console.log('sign up success!')
      updateSignUpStage('confirmSignUp')
      updatesnackbarMsg("An AuthCode has been send to the submitted email. Please confirm AuthCode.")

    } catch (err) {
      // console.log('error signing up..', err)
      updatesnackbarMsg(err.message)
    }
  }

  export async function confirmSignUp({ confirmationcode }, email, updateFormType, updatesnackbarMsg) {
    try {
      await Auth.confirmSignUp(email, confirmationcode)
      console.log('confirm sign up success!')
      updateFormType('signIn')
      updatesnackbarMsg("Email Verified. Please Sign In.")
    } catch (err) {
      updatesnackbarMsg(err.message)
      console.log('error confirming signing up..', err)
    }
  }

  //first paraemter is objet, deconstructed
  export async function signIn({ username, password },updateFormType, updatesnackbarMsg) {

    //  console.log(username)
    // console.log(password)
    try {
     const user = await Auth.signIn(username, password)
    //  console.log(user.attributes.email)
      //setUSer before updating state because auth will check user
      setUser({username : user.attributes.email})
      updateFormType('loggedIn')
      console.log('sign in success!')
    } catch (err) {
      // console.log('error signing up..', err)
      updatesnackbarMsg(err.message)
    }
  }