//https://www.gatsbyjs.org/tutorial/authentication-tutorial/


import React from "react"
import { Redirect } from "@reach/router";
import { isLoggedIn } from "./utils"


export default  ({ component: Component, location, ...rest }) =>
 {
  if (!isLoggedIn() && location.pathname !== `/app/signin`) {
    return <Redirect  to='/app/signin' noThrow/>
  } 
    return <Component {...rest} />

  
}

//https://reach.tech/router/api/Redirect
//Redirect works with componentDidCatch to prevent the tree from rendering and starts over with a new location.
//For example, a redirect will trigger Create React App’s error overlay

//Redirect should be inside a router