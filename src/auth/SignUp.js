import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import useAuthStyles from "./style";
import SimpleSnackbar from "./components/snackbar";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

export default () => {

 
  const classes = useAuthStyles();

  const [snackbarMsg, updatesnackbarMsg] = useState(null);

  const { register, handleSubmit, errors, watch } = useForm();

  const onSignUp = values => {
    // console.log(values)
    signUp(values);
  };

  async function signUp({ username, password }) {
    try {
      await Auth.signUp({
        username,
        password
      });

      //console.log("sign up success!");
      //https://reach.tech/router/api/navigate
      // // put some state on the location
      //https://github.com/reach/router/issues/96
      navigate("/confirmsignup", {
        state: {
          username,
          msg:
            "An AuthCode has been send to the submitted email. Please confirm AuthCode."
        }
      });
    } catch (err) {

      //console.log("Error");
      //the error boject
      //console.log(err)
      updatesnackbarMsg(err.message);
    }
  }

  //Required is required, Or else it will pass a blank field"

  //https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext
  return (
    <div className={classes.paper}>

      <Avatar className={classes.avatar}>
        <PersonAddIcon />
      </Avatar>

      {/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles */}
      <Typography component="h1" variant="h5" role="heading">
        Sign Up
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onSignUp)}>
        {/* variant is border
                  margin is top bottom*/}
        <TextField
          id="Email"
          name="username"
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          inputRef={register({
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            required: true
          })}
          error={!!errors.username}
          helperText={errors.username && "Email not valid."}
        />

        <TextField
          id="password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          label="Password"
          fullWidth
          inputRef={register({
            minLength: {
              value: 8
            },
            required: true
          })}
          error={!!errors.password}
          helperText={errors.password && "Minimum Length of 8."}
        />

        <TextField
          id="password2"
          name="password2"
          type="password"
          variant="outlined"
          margin="normal"
          label="Confirm Password"
          fullWidth
          inputRef={register({
            validate: value => value === watch("password"),
            required: true
          })}
          error={!!errors.password}
          helperText={errors.password2 && "Passwords don't match."}
        />

        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Sign Up
        </Button>
      </form>

      <Grid container>
            <Grid item xs>
              {/* https://material-ui.com/components/links/ */}
              {/* color="primary" as the link needs to stand out.
              variant="inherit" as the link will, most of the time, be used as a child of a Typography component. */}
              <Link href="/confirmsignup"  variant="body2"  color="secondary">
                Confirm email
              </Link>
            </Grid>
            <Grid item>
            <Link href="/signin"  variant="body2"  color="secondary">
                Sign In
              </Link>
            </Grid>
          </Grid>

      {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
    </div>
  );
};
