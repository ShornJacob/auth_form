import React from "react";

export default function SignIn(props) {

    const {signIn,updateFormState} = props
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
          props.updateFormState(e);
        }}
        placeholder="password"
      />
      <button  onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}
