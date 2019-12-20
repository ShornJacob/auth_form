//https://material-ui.com/components/app-bar/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { navigate } from "@reach/router";
import {logout} from 'auth/util'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* Simple App Bar */}
          </Typography>
          <Button color="inherit" onClick={() => navigate('/signup')}>SignUp</Button>
          <Button color="inherit" onClick={() => navigate('/confirmsignup')}>ConfirmSignUp</Button>
          <Button color="inherit" onClick={() => navigate('/signin')}>SignIn</Button>
          <Button color="inherit" onClick={() => logout(()=>navigate('/signin'))}>SignOut</Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
          <Button color="inherit" onClick={() => navigate('/forgotpassword')}>ForgotPassword</Button>
          <Button color="inherit" onClick={() => navigate('/forgotpasswordsubmit')}>ForgotPassword</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}