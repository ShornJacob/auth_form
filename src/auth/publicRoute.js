//https://www.gatsbyjs.org/tutorial/authentication-tutorial/#controlling-private-routes

import React from "react"
import { navigate } from "@reach/router";
import { isLoggedIn } from "../services/auth"

const PublicRoute = ({ component: Component, location, ...rest }) => {
    // console.log(isLoggedIn())
 

  if (isLoggedIn() &&  (location.pathname === `/signup` ||
  location.pathname === `/confirmsignup` ||
  location.pathname === `/forgotpassword` ||
  location.pathname === `/forgotpasswordsubmit` ||
  location.pathname === `/signin`) &&
  (location.pathname !== `/` ||  location.pathname !== `/profile`) ) {
    navigate(`/profile`)
    return null
  }

  return <Component location={location} {...rest} />
}
export default PublicRoute