import React from "react";
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import ConfirmSignUp from "./ConfirmSignUp";
import Layout from "../Layout";
import SignIn from './SignIn'

export default function AppWithRouter() {
  return (
    <Layout>
      <Router>
        <SignUp path="/signup" />
        <ConfirmSignUp path="/confirmsignup" />
        <SignIn path="/signin" />
      </Router>
    </Layout>
  );
}

