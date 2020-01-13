//https://material-ui.com/components/app-bar/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { navigate } from "@reach/router";
import { logout } from "services/auth";
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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

//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/app-bar/MenuAppBar.js
export default function SimpleAppBar({
  authenticated,
  authenticating,
  email,
  logoutSuccess
}) {
  const classes = useStyles();
  // console.log(authenticated)
  // console.log(email)


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  let menuItems

  //Unauthenticated Menu
  let unauthMenu = (
    <div>
          <MenuItem onClick={() => navigate("/signin")}>Sign In</MenuItem>
          <MenuItem onClick={() => navigate("/signup")}>Sign Up</MenuItem>
          <MenuItem onClick={() =>  navigate("/confirmsignup")}>Confirm Sign Up</MenuItem>
          <MenuItem onClick={() => navigate("/forgotpassword")}>Request Password Reset</MenuItem>
          <MenuItem onClick={() => navigate("/forgotpasswordsubmit")}>Reset Password</MenuItem>
    </div>
  )

  let authMenu = (
    <div>
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={() =>
            logout(() => {
              logoutSuccess()
              navigate("/signin");
            })
          }>Sign Out</MenuItem>
        
    </div>
  )
  
  menuItems = authenticated ? authMenu : unauthMenu
      

  // console.log(menuItems)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {authenticated ? email : "Transparency Consulting"}
          </Typography>
          {/* https://reactjs.org/docs/conditional-rendering.html       */}
          {/* {links} */}

          <div>
              <IconButton
                aria-label="account menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuOpenIcon />
              </IconButton>
              
          
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {menuItems}
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
