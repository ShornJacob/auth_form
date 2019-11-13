//https://github.com/dabit3/aws-amplify-workshop-react#custom-authentication-strategies

import React, { useReducer } from "react";

export default function App() {
  // define initial state
  const initialState = {
    email: "",
    password: ""
  };

  // create reducer
  function reducer(state, action) {
    switch (action.type) {
      case "SET_INPUT":
        return { ...state, [action.inputName]: action.inputValue };
      default:
        return state;
    }

    
  }

  // useReducer hook creates local state
  //array destructuring
  const [state, dispatch] = useReducer(reducer, initialState);

  // event handler
  function onChange(e) {
    dispatch({
      type: "SET_INPUT",
      inputName: e.target.name,
      inputValue: e.target.value
    });

    // console.log(state)
    
  }

  return (
    <div>
      <input
        name="email"
        placeholder="email"
        value={state.username}
        onChange={onChange}
      />

      <input
        name="password"
        placeholder="password"
        value={state.username}
        onChange={onChange}
      />
    </div>
  );
}
