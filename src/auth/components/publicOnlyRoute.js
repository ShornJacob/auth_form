//https://www.gatsbyjs.org/tutorial/authentication-tutorial/#controlling-private-routes

import React from "react";
import { navigate } from "@reach/router";
import { isLoggedIn, isBrowser } from "auth/util";

const PublicOnlyRoute = ({ component: Component, ...rest }) => {

  console.log(window.location.pathname)
  console.log(isLoggedIn())
  console.log(isBrowser())
  if (
    isLoggedIn() &&
    isBrowser() &&
    (window.location.pathname === `/signup` ||
      window.location.pathname === `/confirmsignup` ||
      window.location.pathname === `/signin`) &&
      (window.location.pathname !== `/` ||
      window.location.pathname !== `/profile`)
    
  ) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/profile`);
    return null;
  }
  return <Component {...rest} />;
};

export default PublicOnlyRoute;
