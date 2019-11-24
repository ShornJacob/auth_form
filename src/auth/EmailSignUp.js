import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import { signUp } from "./amplify";
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';

export default function EmailSignUp(props) {

  const { updateFormType, updatesnackbarMsg, updateSignUpStage,updateEmail } = props;
  const { register, handleSubmit, errors , watch} = useForm();

  // const stateUpdates = {
  //   updateFormType,
  //   updateServerError,
  //   updateSignUpStage
  // }

  const onSubmit = values => {
     // updateFormType is not needed here
    signUp(values, updateSignUpStage, updatesnackbarMsg );
    //can set Email to confirm here
    updateEmail(values.username)
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" fullWidth variant="outlined">
          Sign Up
        </Button>
      </form>

      <Grid container>
            <Grid item xs>
              {/* if not passed as a function, it will be executed */}
              <Link component="button"   onClick={ () => updateFormType("signIn")}  >
                Sign In
              </Link>
            </Grid>
            <Grid item>
            <Link component="button"   onClick={ () => updateFormType("forgotPassword")}  >
                Resend AuthCode
              </Link>
            </Grid>
          </Grid>
    </div>
  );
}
