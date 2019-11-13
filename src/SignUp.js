import React from "react";

export default function SignUp(props) {

    const {updateFormState,signUp} = props
  return (
    <div>
      <input
        name="username"
        onChange={e => {
          e.persist();
          updateFormState(e);
        }}
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        onChange={e => {
          e.persist();
          updateFormState(e);
        }}
        placeholder="password"
      />

    
      <button onClick={signUp}>
        Sign Up
      </button>
    </div>
  );
}
