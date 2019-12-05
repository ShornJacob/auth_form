import React from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ConfirmSignUp from "./ConfirmSignUp";
import Layout from "../Layout";

function App() {
  return (
    <Layout>
      <Router>
        <SignUp path="/signup" />
        <ConfirmSignUp path="/confirmsignup" />
      </Router>
    </Layout>
  );
}

export default App;
