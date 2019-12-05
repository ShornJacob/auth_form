import React, { useState } from "react";
import { isLoggedIn, logout } from "./util";
import SignIn from "./SignIn";
import SignUp from "./_SignUp";
import User from "./User";
import SimpleSnackbar from "../components/Snackbar";

export default () => {
  const initialFormType = isLoggedIn() ? "loggedIn" : "signIn";

  const [formType, updateFormType] = useState(initialFormType);
  const [snackbarMsg, updatesnackbarMsg] = useState(null);

  const stateUpdates = {
    updateFormType,
    updatesnackbarMsg
  };

  //   console.log(formType)
  //   console.log(isLoggedIn())

  function renderAuth() {
    switch (formType) {
      case "signIn":
        return <SignIn {...stateUpdates} />;
      case "signUp":
        return <SignUp {...stateUpdates} />;
      case "loggedIn":
        return (
          //logout takes a callback to execute
          <User logout={() => logout(() => updateFormType("signIn"))} />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {renderAuth()}
      {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
    </div>
  );
};
