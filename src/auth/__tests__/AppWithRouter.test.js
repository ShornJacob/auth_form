import React from 'react'
import { render } from '@testing-library/react'
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'
import '@testing-library/jest-dom/extend-expect'
import MutationObserver from 'mutationobserver-shim'
import renderWithRouter from '../util/renderWithRouter'
import AppWithRouter from '../AppWithRouter'



// this is a handy function that I would utilize for any component
// that relies on the router being in context
// function renderWithRouter(
//   ui,
//   { route = '/', history = createHistory(createMemorySource(route)) } = {}
// ) {
//   return {
//     ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
//     // adding `history` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     history,
//   }
// }

//https://testing-library.com/docs/guide-which-query
//https://testing-library.com/docs/dom-testing-library/api-queries#bytext
test('app renders signup route', async () => {
  const {
    getByRole,
    history: { navigate },
  } = renderWithRouter(<AppWithRouter />)

  // with reach-router we don't need to simulate a click event, we can just transition
  // to the page using the navigate function returned from the history object.
  await navigate('/signup')

  //https://testing-library.com/docs/dom-testing-library/api-queries#byrole
  //https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
  const element= getByRole('heading')

  //https://github.com/testing-library/jest-dom
  //https://github.com/testing-library/jest-dom#tohavetextcontent
  expect(element).toHaveTextContent(/sign up/i)
})

//https://react-hook-form.com/faqs/#TestingfailedduetoMutationObserver

//https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill
//// A shim is any piece of code that performs interception of an API call and provides a layer of abstraction. It isn't necessarily restricted to a web application or HTML5/CSS3.

// A polyfill is a type of shim that retrofits legacy browsers with modern HTML5/CSS3 features usually using Javascript or Flash.
// a polyfill is a shim for a browser API

test('full app rendering/navigating', async () => {
  const {
    getByRole,
    history: { navigate },
  } = renderWithRouter(<AppWithRouter />)

  await navigate('/confirmsignup')

  const element= getByRole('heading')

  expect(element).toHaveTextContent(/confirm sign up/i)
})