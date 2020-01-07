//https://www.gatsbyjs.org/tutorial/authentication-tutorial/#controlling-private-routes

import React from "react"
import { navigate } from "@reach/router";
import { isLoggedIn } from "../services/auth"
const PrivateRoute = ({ component: Component, location, ...rest }) => {

 

  if (!isLoggedIn() && location.pathname !== `/signin`) {
    navigate(`/signin`)
    return null
  }
 
  return <Component {...rest} />
}
export default PrivateRoute