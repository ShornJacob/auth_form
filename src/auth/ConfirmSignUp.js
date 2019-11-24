import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import { confirmSignUp } from "./amplify";

export default function EmailSignUp(props) {

  const { updateFormType, email,  updatesnackbarMsg } = props;

  const { register, handleSubmit } = useForm();

  // const stateUpdates = {
  //   updateFormType,
  //   updateServerError,
  //   updateSignUpStage
  // }

  const onSubmit = values => {
     // updateFormType is not needed here
     //email is from porps, not from this form
    confirmSignUp(values, email, updateFormType, updatesnackbarMsg);
    
  };

  console.log(email)

  return (
    <div>
      <Typography component="h1" variant="h5">
        Confirm Code
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* variant is border
            margin is top bottom*/}
      
        <TextField
          name="confirmationcode"
          variant="outlined"
          margin="normal"
          label="AuthCode"
          fullWidth
          inputRef={register({
            minLength: {
              value: 6
            }
          })}

      
        />

        <Button type="submit" fullWidth variant="outlined">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
