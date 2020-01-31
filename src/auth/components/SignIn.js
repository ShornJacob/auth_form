import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Link from '@material-ui/core/Link';
import useForm from "react-hook-form";
import React, { useState } from "react";
import useAuthStyles from "../style";
import SimpleSnackbar from "./Snackbar";
import Avatar from "@material-ui/core/Avatar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {setUser} from '../util'

export default ({ location: { state }, loginSuccess }) => {

  // console.log(loginSuccess)
  let msgforBar;

  //https://www.ajaymatharu.com/javascript-difference-between-undefined-and-null/
  //undefined is a type itself (undefined) while null is an object.
  //https://stackoverflow.com/questions/3390396/how-to-check-for-undefined-in-javascript
  if (typeof state !== 'undefined') {
    //https://stackoverflow.com/questions/11040472/how-to-check-if-object-property-exists-with-a-variable-holding-the-property-name
    if(state.hasOwnProperty('msg')){
      msgforBar = state.msg;
  }
    //msgforBar = state.msg;
  }

  const classes = useAuthStyles();

  const [snackbarMsg, updatesnackbarMsg] = useState(msgforBar);

  const { register, handleSubmit, errors } = useForm();

  const onSignIn= values => {
    // console.log(values)
    signIn(values);
  };

  //https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin
  async function signIn({ username, password }) {
    try {
      const cognitoUser = await Auth.signIn(username,password);

     //https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
      const {signInUserSession: {idToken: {payload : {email}}  }} = cognitoUser
      const {signInUserSession: {idToken: {payload }  }} = cognitoUser
     
      //https://stackoverflow.com/questions/4925760/selecting-a-json-object-with-a-colon-in-the-key
      //js allows colon in keys. :-(
      const groups = payload['cognito:groups']
     
      // console.log(email )
      // console.log(username)

      //an object needs to be set in localstorage
      setUser({username : email , group : groups})
      loginSuccess(username)
      navigate("/profile")
    } catch (err) {

      //console.log("Error");
      //the error boject
      //console.log(err)
      updatesnackbarMsg(err.message);
    }
  }


  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountBoxIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign In
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onSignIn)}>
        {/* variant is border
            margin is top bottom*/}
        <TextField
          name="username"
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          inputRef={register({
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
          })}
          error={!!errors.username}
          helperText={errors.username && "Email not valid."}
        />

        <TextField
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          label="Password"
          fullWidth
          inputRef={register({
            minLength: {
              value: 8
            }
          })}
          error={!!errors.password}
          helperText={errors.password && "Minimum Length of 8."}
        />
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Sign In
        </Button>
      </form>

   
      <Grid container>
            <Grid item xs>
              {/* https://material-ui.com/components/links/ */}
              {/* color="primary" as the link needs to stand out.
              variant="inherit" as the link will, most of the time, be used as a child of a Typography component. */}
              <Link href="/signup"  variant="body2"  color="secondary">
                Sign Up
              </Link>
            </Grid>
            <Grid item>
            <Link href="/forgotpassword"  variant="body2"  color="secondary">
                Password Reset
              </Link>
            </Grid>
          </Grid>

      {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
    </div>
  );
};

//https://material-ui.com/api/link/
//https://material-ui.com/components/links/
//If a link doesn't have a meaningful href, it should be rendered using a <button> element.
