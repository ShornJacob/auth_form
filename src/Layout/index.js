//https://www.gatsbyjs.org/docs/layout-components/
import React from "react"
//https://material-ui.com/components/container/
import Container from '@material-ui/core/Container';
import SimpleAppBar from '../auth/components/simpleAppBar'
//https://material-ui.com/styles/advanced/
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

export default function SimpleContainer({children}) {
    return (
      <React.Fragment>
         <ThemeProvider theme={theme}>
        <SimpleAppBar/>
        <Container component="main" maxWidth="xs">
          {children}
        </Container>
        </ThemeProvider>
      </React.Fragment>
    );
  }