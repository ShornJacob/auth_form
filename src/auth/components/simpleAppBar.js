//https://material-ui.com/components/app-bar/

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { navigate } from "@reach/router";
import { logout } from "services/auth";

//https://reactjs.org/docs/test-utils.html#isdomcomponent

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function SimpleAppBar({ authenticated , authenticating, email }) {
  const classes = useStyles();
  // console.log(authenticated)
  // console.log(email)

  let links;
    if (authenticated) {
        links = (
        <React.Fragment>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={() => logout(() => navigate("/signin"))}
          >
            SignOut
          </Button>
        </React.Fragment>
      );
    } else {   
        links = (
        <React.Fragment>
          <Button color="inherit" onClick={() => navigate("/signin")}>
            SignIn
          </Button>
          <Button color="inherit" onClick={() => navigate("/signup")}>
            SignUp
          </Button>
          <Button color="inherit" onClick={() => navigate("/confirmsignup")}>
            ConfirmSignUp
          </Button>
          <Button color="inherit" onClick={() => navigate("/forgotpassword")}>
            ForgotPassword
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/forgotpasswordsubmit")}
          >
            ForgotPasswordSubmit
          </Button>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {authenticated ? email : "Transparency Consulting" }
            </Typography>
            {/* https://reactjs.org/docs/conditional-rendering.html       */}
            {links}
          </Toolbar>
        </AppBar>
      </div>
    );
  };


 