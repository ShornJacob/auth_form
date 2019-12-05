import React, { useState } from "react";
import useForm from "react-hook-form";
import useAuthStyles from "./style";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signUp, confirmSignUp } from "./amplify";
import SimpleSnackbar from "../components/Snackbar";

//https://github.com/dabit3/amplify-auth-demo/blob/master/src/Form.js

export default props => {
  const classes = useAuthStyles();

  const [formType, updateFormType] = useState("emailSignUp");

  const [email, updateEmail] = useState(null);

  const [snackbarMsg, updatesnackbarMsg] = useState(null);

  const { register, handleSubmit, errors, watch } = useForm();

  const onEmailSignUp = values => {
    //state and updaters can be accessed here
    signUp(values, updateFormType, updatesnackbarMsg);
    updateEmail(values.username)
    console.log(email)
  };

  const onConfirmCode = values => {
    console.log(values, email);
    confirmSignUp(values,email,updatesnackbarMsg)
  };

  console.log(email);
  console.log(formType);

  function header() {
    switch (formType) {
      case "emailSignUp":
        return "Sign Up";
      case "confirmSignUp":
        return "Confirm Code";
      default:
        return null;
    }
  }

  function renderForm() {
    switch (formType) {
      case "emailSignUp":
        return (
          <form className={classes.form} onSubmit={handleSubmit(onEmailSignUp)}>
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

            <TextField
              name="password2"
              type="password"
              variant="outlined"
              margin="normal"
              label="Confirm Password"
              fullWidth
              inputRef={register({
                validate: value => value === watch("password")
              })}
              error={!!errors.password}
              helperText={errors.password2 && "Passwords don't match."}
            />

            <Button  className={classes.submit} type="submit" fullWidth variant="outlined">
              Sign Up
            </Button>
          </form>
        );

      case "confirmSignUp":
        // props updateFormType, updateServerError
        return (
          <form className={classes.form} onSubmit={handleSubmit(onConfirmCode)}>
            <TextField
                name="confirmationcode"
                variant="outlined"
                margin="normal"
                label="AuthCode"
                fullWidth
                inputRef={register}      
              />
      
            <Button className={classes.submit} type="submit" fullWidth variant="outlined">
              Confirm Code
            </Button>
          </form>
        );

      default:
        return null;
    }
  }

  return (
    <div>
      <Typography component="h1" variant="h5">
        {header()}
      </Typography>
      <div className={classes.paper}>
      {renderForm()}
      </div>

      {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
    </div>
  );
};
