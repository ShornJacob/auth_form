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


  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };

  //onclicking the iconbutton, the anchorEl of menu is set to the IconButton
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
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                // keepMounted
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'right',
                // }}
                open={Boolean(anchorEl)}
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

//https://material-ui.com/components/menus/
//https://material-ui.com/api/menu/
//anchorEl The DOM element used to set the position of the menu.

//open *	bool		If true, the menu is visible.
//open is  a Boolean of anchor element
//onClose	func		Callback fired when the component requests to be closed.

//he Menu component uses the Popover component internally. 
//Popover has anchorOrigin


//Modal is a lower-level construct that is leveraged byPopover
//keepMounted	bool	false	Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Modal.

//https://material-ui.com/components/buttons/
//con buttons are commonly found in app bars and toolbars.

//https://stackoverflow.com/questions/40167287/react-material-ui-how-do-i-know-i-can-use-onclick-for-button
//https://reactjs.org/docs/events.html#mouse-events
//onClick is from react