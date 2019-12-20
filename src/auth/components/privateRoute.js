//https://www.gatsbyjs.org/tutorial/authentication-tutorial/#controlling-private-routes

import React from "react"
import { navigate } from "@reach/router";
import { isLoggedIn, isBrowser } from "auth/util"


const PrivateRoute = ({ component: Component, ...rest }) => {
  if (
    !isLoggedIn() &&
    isBrowser &&
    window.location.pathname !== `/login`
  ) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/signin`)
    return null
  }
  return (
      <Component {...rest} />
  )
}

export default PrivateRoute