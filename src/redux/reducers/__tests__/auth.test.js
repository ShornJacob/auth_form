//https://redux.js.org/recipes/writing-tests/

import { LOGIN_SUCCESS } from "redux/actionTypes";
import { loginSuccess } from "redux/actions";
import {authReducer} from "redux/reducers/auth";

describe("auth reducer", () => {
  const initialState = {
    AUTHENTICATED: false,
    AUTHENTICATING: false,
    email: null
  };

  it("should return the initial state", () => {
    expect(authReducer(initialState, {})).toEqual({
      AUTHENTICATED: false,
      AUTHENTICATING: false,
      email: null
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(authReducer(initialState, loginSuccess("test@test.com"))).toEqual(
      {
        AUTHENTICATED: true,
        AUTHENTICATING: false,
        email: "test@test.com"
      }
    );
  });
});
