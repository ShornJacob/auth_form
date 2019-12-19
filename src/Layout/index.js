//https://www.gatsbyjs.org/docs/layout-components/
import React from "react"
//https://material-ui.com/components/container/
import Container from '@material-ui/core/Container';

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

export default function SimpleContainer({children}) {
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          {children}
        </Container>
      </React.Fragment>
    );
  }