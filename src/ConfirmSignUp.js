import React from "react";

export default function ConfirmSignUp(props) {

    const {confirmSignUp,updateFormState} = props

  return (
    <div>
      <input
        name="confirmationCode"
        onChange={e => {
          e.persist();
          updateFormState(e);
        }}
        placeholder="confirmationCode"
      />

    
      <button onClick={confirmSignUp}>
        Confirm Sign Up
      </button>
    </div>
  );
}
