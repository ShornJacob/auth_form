import React from "react";
import { Router } from "@reach/router";
import SignUp from "./signUp";
import ConfirmSignUp from "./confirmSignUp";
import Layout from "../layout";
import SignIn from './signIn'
import Profile from 'auth/profile'
import PrivateRoute from 'auth/components/privateRoute'
import PublicOnlyRoute from 'auth/components/publicOnlyRoute'

export default function AppWithRouter() {
  return (
    <Layout>
      <Router>
  
        <PublicOnlyRoute path="/signup" component={SignUp} />
        <PublicOnlyRoute path="/confirmsignup"component={ConfirmSignUp} />
        <PublicOnlyRoute path="/signin"component={SignIn } />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/" component={Profile} />
      </Router>
    </Layout>
  );
}

