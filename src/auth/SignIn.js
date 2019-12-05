import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Link from '@material-ui/core/Link';
import useForm from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "./amplify";
import useAuthStyles from './style';
import Container from '@material-ui/core/Container';
import SimpleSnackbar from "../components/Snackbar";


export default (props) => {

  const classes = useAuthStyles();

  const [snackbarMsg, updatesnackbarMsg] = useState(null);

  const { register, handleSubmit, errors } = useForm();
 
  //state updater passes
  const onSubmit = values => signIn(values, updatesnackbarMsg);


  return (
 
    <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>

      <form  className={classes.form} onSubmit={handleSubmit(onSubmit)} >
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
          inputRef={register ({
            minLength : {
              value : 8
            }
          })}
          error={!!errors.password}
          helperText={errors.password && "Minimum Length of 8."}
        />
        <Button  className={classes.submit} type="submit" fullWidth variant="outlined">
          Sign In
        </Button>
      </form>

    {/*  <Grid container>
            <Grid item xs>
              {/* if not passed as a function, it will be executed 
              <Link component="button"   onClick={ () => updateFormType("signUp")}  >
                Sign Up
              </Link>
            </Grid>
            <Grid item>
            <Link component="button"   onClick={ () => updateFormType("forgotPassword")}  >
                Forgot password
              </Link>
            </Grid>
          </Grid> */}
    </div>


    {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
    </Container>
    );
}

//https://material-ui.com/api/link/
//https://material-ui.com/components/links/
//If a link doesn't have a meaningful href, it should be rendered using a <button> element.
