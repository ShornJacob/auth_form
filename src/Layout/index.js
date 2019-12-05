//https://www.gatsbyjs.org/docs/layout-components/
import React from "react"
//https://material-ui.com/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';
//https://material-ui.com/components/container/
import Container from '@material-ui/core/Container';

export default function SimpleContainer({children}) {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xs">
          {children}
        </Container>
      </React.Fragment>
    );
  }