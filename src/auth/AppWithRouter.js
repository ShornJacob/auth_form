import React from "react";
import { Router } from "@reach/router";
import SignUp from "./signUp";
import ConfirmSignUp from "./confirmSignUp";
import Layout from "../layout";
import SignIn from './signIn'
import Profile from 'auth/profile'
import ForgotPassword from 'auth/forgotPassword'
import ForgotPasswordSubmit from 'auth/forgotPasswordSubmit'
import PrivateRoute from 'auth/privateRoute'
import PublicRoute from 'auth/publicRoute'

export default function AppWithRouter() {
  return (
    <Layout>
      <Router> 
        <PublicRoute path="/signin" component={SignIn } />
        <PrivateRoute path="/profile" component={Profile} />
        <PublicRoute path="/signup" component={SignUp} />
        <PublicRoute path="/confirmsignup"component={ConfirmSignUp} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/" component={Profile} />
        <PublicRoute path="/forgotpassword" component={ForgotPassword} />
        <PublicRoute path="/forgotpasswordsubmit" component={ForgotPasswordSubmit} />
      </Router>
    </Layout>
  );
}

