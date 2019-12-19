//https://jestjs.io/docs/en/mock-functions#mocking-modules
//This seems to call a mock module

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
  cleanup,
  waitForElement,
  act
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "../SignUp";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import MutationObserver from "mutationobserver-shim";

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}))

//https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
//set all exports of a module to the Mock Function
//mock the module

//https://stackoverflow.com/questions/44467657/jest-better-way-to-disable-console-inside-unit-tests
// beforeEach(() => {
//   jest.spyOn(console, 'log').mockImplementation(() => {});
// });

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
    expect(getByText(/email not valid/i)).toBeInTheDocument();
  });
});

test("password warning is displayed for length", async () => {
  //Arrange
  const { getByLabelText, getByRole, getByText } = render(<SignUp />);

  //Act
  fireEvent.change(getByLabelText("Password", { exact: true }), {
    target: { value: "1" }
  });
  fireEvent.click(getByRole("button"));

  //Assert
  await wait(() => {
    expect(getByText(/Minimum Length of 8/i)).toBeInTheDocument();
  });
});

test("confirm password non match", async () => {
  //Arrange
  const { getByLabelText, getByRole, getByText } = render(<SignUp />);

  //Act
  fireEvent.change(getByLabelText("Password", { exact: true }), {
    target: { value: "1" }
  }); //exact match

  fireEvent.change(getByLabelText(/confirm password/i), {
    target: { value: "2" }
  }); //// ignore case

  fireEvent.click(getByRole("button"));

  //Assert
  await wait(() => {
    expect(getByText(/Passwords don't match/i)).toBeInTheDocument();
  });
});

//https://jestjs.io/docs/en/manual-mocks
test("server error message", async () => {
  //Arrange

  const { getByLabelText, getByRole, getByText, container } = render(
    <SignUp />
  );

  jest.spyOn(console, "log").mockImplementation(() => {});

  Auth.signUp = jest.fn().mockImplementation(() => {
    //The throw statement throws a user-defined exception
    //The Error constructor creates an error object, so it already throws an object
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    throw new Error("Error Message");
  });

  //https://jestjs.io/docs/en/mock-function-api.html#mockfnmockimplementationfn
  //https://jestjs.io/docs/en/jest-object#jestfnimplementation
  //jest.fn(implementation) is a shorthand for jest.fn().mockImplementation(implementation)
  // mock response that returns a message from server
  // const mockFn = jest.fn( () => {
  //   throw new Error({
  //     message : "An account with the given email already exists."
  //   })
  // })

  //https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
  //https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
  //Sometimes you only want to watch a method be called, but keep the original implementation
  //const spy = jest.spyOn(Auth, 'signUp').mockFn;

  //Act
  fireEvent.change(getByLabelText(/email/i), {
    target: { value: "unacceptable@email.com" }
  });
  fireEvent.change(getByLabelText("Password", { exact: true }), {
    target: { value: "12345678" }
  }); //exact match

  fireEvent.change(getByLabelText(/confirm password/i), {
    target: { value: "12345678" }
  }); //// ignore case

  fireEvent.click(getByRole("button"));

  //Assert
  // await wait(() => {
  //   expect(getByText(/An account with the given email already exists/i)).toBeInTheDocument();
  // });

  expect(navigate).toHaveBeenCalledTimes(0)
  
  const snackBarElement = await waitForElement(() =>
    getByText(/error message/i)
  );
  // { container }
});

//https://github.com/reach/router/issues/76
// test("sucessfull signup navigation", async () => {
  
//   Auth.signUp = jest.fn().mockImplementation(() => {
//     //console.log("mocked")
//     throw Promise.resolve("");
//   });

 

//   const { getByLabelText, getByRole, getByText, container } = render(
//     <SignUp />
//   );

//   fireEvent.change(getByLabelText(/email/i), {
//     target: { value: "acceptable@email.com" }
//   });
//   fireEvent.change(getByLabelText("Password", { exact: true }), {
//     target: { value: "12345678" }
//   }); //exact match

//   fireEvent.change(getByLabelText(/confirm password/i), {
//     target: { value: "12345678" }
//   }); //// ignore case


//   fireEvent.click(getByRole("button"));

//   expect(navigate).toHaveBeenCalledTimes(1)
//  })

    

   
   
    
    

  
 

 
