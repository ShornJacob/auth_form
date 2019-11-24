import React, { useState } from "react";
import EmailSignUp from './EmailSignUp'
import ConfirmSignUp from './ConfirmSignUp'

export default function SignUp(props) {

  const { updateFormType, updatesnackbarMsg } = props;


  const [email, updateEmail] = useState("emailSignUp");
  const [stage, updateSignUpStage] = useState("emailSignUp");


  const signUpUpdates = {
    updateFormType,
    updateSignUpStage,
    updateEmail,
    updatesnackbarMsg
 
  }

  const confirmUpdates = {
    updateFormType,
    email,
    updatesnackbarMsg
 
  }


  //console.log(stage)

  function renderForm() {
    switch (stage) {
        case "emailSignUp":
            return (
                
              <EmailSignUp { ...signUpUpdates} />
            );
        case "confirmSignUp" :
             // props updateFormType, updateServerError
            return (
              <ConfirmSignUp {...confirmUpdates} />
            );
            
      default:
        return null;
    }
  }

  return (
    <div>
      {renderForm()}
    </div>
  );
}
