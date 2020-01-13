import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import useAuthStyles from "./style";
import SimpleSnackbar from "./components/Snackbar";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

export default () => {

 
  const classes = useAuthStyles();

  const [snackbarMsg, updatesnackbarMsg] = useState(null);

  const { register, handleSubmit, errors} = useForm();

  const onForgotPassword = values => {
    // console.log(values)
    forgotPassword(values);
  };

  async function forgotPassword({ username }) {
    try {
      await Auth.forgotPassword(username);

      //console.log("sign up success!");
      //https://reach.tech/router/api/navigate
      // // put some state on the location
      //https://github.com/reach/router/issues/96
      navigate("/forgotpasswordsubmit", {
        state: {
          username,
          msg:
            "A reset code has been send to the submitted email. Confirm a new password using the code."
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
        <LockOpenIcon />
      </Avatar>

      {/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles */}
      <Typography component="h1" variant="h5" role="heading">
        Request Password Reset Code
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onForgotPassword)}>
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

        
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="outlined"
        >
            Request
        </Button>
      </form>

      <Grid container>
            <Grid item xs>
              {/* https://material-ui.com/components/links/ */}
              {/* color="primary" as the link needs to stand out.
              variant="inherit" as the link will, most of the time, be used as a child of a Typography component. */}
              <Link href="/forgotpasswordsubmit"  variant="body2"  color="secondary">
                Reset Password with code
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
