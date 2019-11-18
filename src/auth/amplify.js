//https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
//https://aws-amplify.github.io/amplify-js/api/interfaces/signupparams.html

import {Auth}  from "aws-amplify";
import {setUser} from './util';

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

  //first paraemter is objet, deconstructed
  export async function signIn({ username, password },updateFormType) {

    // console.log(username)
    // console.log(password)
    try {
     const user = await Auth.signIn(username, password)
    //  console.log(user.attributes.email)
      //setUSer before updating state because auth will check user
      setUser({username : user.attributes.email})
      updateFormType('loggedIn')
      console.log('sign in success!')
    } catch (err) {
      console.log('error signing up..', err)
    }
  }