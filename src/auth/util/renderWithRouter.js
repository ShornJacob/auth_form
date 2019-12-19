
import React from "react";
//https://testing-library.com/docs/example-reach-router
import {
    render,
  } from "@testing-library/react";
import {
    createHistory,
    createMemorySource,
    LocationProvider,
  } from '@reach/router'

// this is a handy function that I would utilize for any component
// that relies on the router being in context

// export default function renderWithRouter( ui, { route = '/', history = createHistory(createMemorySource(route)) } = {}  ) {
  export default function renderWithRouter( ui,  route = '/'  ) {
 //https://reach.tech/router/api/createHistory
let source = createMemorySource(route)
let history = createHistory(source)

    return {
      ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
      // adding `history` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      history,
    }
  }


//https://reach.tech/router/api/LocationProvider
//route can take a parameter