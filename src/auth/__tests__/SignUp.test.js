//https://testing-library.com/docs/react-testing-library/example-intro#step-by-step
//https://testing-library.com/docs/react-testing-library/api
//https://testing-library.com/docs/react-testing-library/api#cleanup
//https://testing-library.com/docs/react-testing-library/cheatsheet#text-match-options
//https://testing-library.com/docs/guide-disappearance
import React from "react";
import {
  render,
  fireEvent,
  wait,
  cleanup
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "../SignUp";
import MutationObserver from "mutationobserver-shim";

afterAll(cleanup);

test("email warning is displayed for non-email", async () => {
  //https://testing-library.com/docs/react-testing-library/example-intro#arrange
  //Arrange
  const { getByLabelText, getByRole, getByText } = render(<SignUp />);

  //Act
  //https://testing-library.com/docs/dom-testing-library/api-events
  fireEvent.change(getByLabelText(/email/i), { target: { value: "shorn" } });
  fireEvent.click(getByRole("button"));

  //Assert
  // wait for appearance
  await wait(() => {
    expect(getByText(/email not valid/i)).toBeInTheDocument()
  })
});

test("password warning is displayed for length", async () => {
  //Arrange
  const { getByLabelText, getByRole, getByText } = render(<SignUp />);

  //Act
  fireEvent.change(getByLabelText('Password', { exact: true }), { target: { value: "1" } });
  fireEvent.click(getByRole("button"));

  //Assert
  await wait(() => {
    expect(getByText(/Minimum Length of 8/i)).toBeInTheDocument()
  })
});

test("confirm password non match", async () => {
  //Arrange
  const { getByLabelText, getByRole, getByText } = render(<SignUp />);

  //Act
  fireEvent.change(getByLabelText('Password', { exact: true }), { target: { value: "1" } }); //exact match
  fireEvent.change(getByLabelText(/confirm password/i), { target: { value: "2" } }); //// ignore case
  fireEvent.click(getByRole("button"));

  //Assert
  await wait(() => {
    expect(getByText(/Passwords don't match/i)).toBeInTheDocument()
  })
});
