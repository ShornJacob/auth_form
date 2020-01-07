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
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

export default ({ location: { state } }) => {
  //undefined unless assigned
  let emailToReset;
  let msgforBar;
  //https://www.tothenew.com/blog/difference-between-undefined-and-null-in-javascript/
  //‘undefined’ is a variable type whereas ‘null’ is an object value.
  //A variable is said to be ‘undefined’ if it has been declared, but no value has been given to it
  //‘null’ is a value that can be assigned to a variable and represents ‘no value’
  if (state !== null) {
    emailToReset = state.username;
    msgforBar = state.msg;
  }

  //  console.log(emailToConfirm)
  //  console.log(msgforBar)

  //console.log(username)
  const classes = useAuthStyles();

  const [snackbarMsg, updatesnackbarMsg] = useState(msgforBar);

  const { register, handleSubmit, errors, watch } = useForm();

  //https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#confirmsignup
  const onForgotPasswordSubmit = values => {
    // console.log(values);
    forgotPasswordSubmit(values);
  };

  async function forgotPasswordSubmit({username, resetcode, newpass}) {

    // console.log(username)
    // console.log(resetcode)
    // console.log(newpass)

    try {
      await Auth.forgotPasswordSubmit(username, resetcode, newpass);

      console.log("reset password success!");

      navigate("/signin", {
        state: {
          msg: "Password successfully reset. Sign in."
        }
      });
    } catch (err) {
      console.log(err);
      updatesnackbarMsg(err.message);
    }
  }

  //Required is required, Or else it will pass a blank field"

  //https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ConfirmationNumberIcon />
      </Avatar>

      {/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles */}
      <Typography component="h1" variant="h5" role="heading">
        Reset Password With Code
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onForgotPasswordSubmit)}>
        {/* variant is border
                  margin is top bottom*/}
        <TextField
          id="Email"
          name="username"
          variant="outlined"
          margin="normal"
          label="Email"
          defaultValue={emailToReset}
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
          id="resetcode"
          name="resetcode"
          // type="password"
          variant="outlined"
          margin="normal"
          label="Reset Code"
          fullWidth
          inputRef={register({
            minLength: {
              value: 6
            },
            required: true
          })}
          error={!!errors.authcode}
          helperText={errors.authcode && "Minimum Length of 8."}
        />

        <TextField
          id="newpass"
          name="newpass"
          type="password"
          variant="outlined"
          margin="normal"
          label="New Password"
          fullWidth
          inputRef={register({
            minLength: {
              value: 8
            },
            required: true
          })}
          error={!!errors.newpass}
          helperText={errors.newpass && "Minimum Length of 8."}
        />

        <TextField
          id="newpass2"
          name="newpass2"
          type="password"
          variant="outlined"
          margin="normal"
          label="Confirm Password"
          fullWidth
          inputRef={register({
            validate: value => value === watch("newpass"),
            required: true
          })}
          error={!!errors.newpass2}
          helperText={errors.newpass2 && "Passwords don't match."}
        />

        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Reset
        </Button>
      </form>

      <Grid container>
        <Grid item xs>
          {/* https://material-ui.com/components/links/ */}
          {/* color="primary" as the link needs to stand out.
              variant="inherit" as the link will, most of the time, be used as a child of a Typography component. */}
          <Link href="/signup" variant="body2" color="secondary">
            Sign Up
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signin" variant="body2" color="secondary">
            Sign In
          </Link>
        </Grid>
      </Grid>

      {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
    </div>
  );
};
