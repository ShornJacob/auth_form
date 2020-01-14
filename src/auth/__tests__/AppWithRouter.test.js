import React from 'react'
import { render,cleanup } from '@testing-library/react'
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'
import '@testing-library/jest-dom/extend-expect'
import MutationObserver from 'mutationobserver-shim'
import renderWithRouter from '../renderWithRouter'
import AppWithRouter from '../appWithRouter'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'


//afterEach is from jest
afterEach(cleanup)

const middlewares = []
const mockStore = configureStore(middlewares)

//https://redux.js.org/recipes/writing-tests/
//can wrap it in a <Provider> with a store created specifically for this unit test.
//https://redux.js.org/recipes/writing-tests/#connected-components
//https://github.com/dmitry-zaets/redux-mock-store



//https://testing-library.com/docs/guide-which-query
//https://testing-library.com/docs/dom-testing-library/api-queries#bytext

//   // with reach-router we don't need to simulate a click event, we can just transition
//   // to the page using the navigate function returned from the history object.
//   await navigate('/signup')

// https://react-hook-form.com/faqs/#TestingfailedduetoMutationObserver

// https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill
// // A shim is any piece of code that performs interception of an API call and provides a layer of abstraction. It isn't necessarily restricted to a web application or HTML5/CSS3.

// A polyfill is a type of shim that retrofits legacy browsers with modern HTML5/CSS3 features usually using Javascript or Flash.
// a polyfill is a shim for a browser API

//https://jestjs.io/docs/en/mock-functions
//The mockImplementation method is useful when you need to define the default implementation of a mock function that is created from another module:

// jest.mock('services/auth');

const initialState = {
  auth : {
    AUTHENTICATED: false,
    AUTHENTICATING: false,
    email: null
  }  
}

const store = mockStore(initialState)

test('testing redering signin page', async () => {

  const {
    getAllByRole,
    history: { navigate },
  } = renderWithRouter(<Provider store={store}><AppWithRouter /></Provider>)

  await navigate('/signin')

  //https://testing-library.com/docs/dom-testing-library/api-queries
  // queries return an array of all matching nodes for a query, and throw an error if no elements match.
  //receives two lements in array - dom nodes
  const element= getAllByRole('heading')

  //check second node
  expect(element[1]).toHaveTextContent(/sign in/i)
})

test('testing rendering signup', async () => {
    const {
      getAllByRole,
      history: { navigate },
    } = renderWithRouter(<Provider store={store}><AppWithRouter /></Provider>)
  
    await navigate('/signup')
  
    //https://testing-library.com/docs/dom-testing-library/api-queries
    // queries return an array of all matching nodes for a query, and throw an error if no elements match.
    //receives two lements in array - dom nodes
    const element= getAllByRole('heading')
  
    //check second node
    expect(element[1]).toHaveTextContent(/sign up/i)
  })


//isLoggedin probbaly returns false beause jsdom is not a browser
// ("",()=>{})