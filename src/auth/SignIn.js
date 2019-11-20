import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import React from "react";
import { signIn } from "./amplify";

export default function SignIn(props) {
  const { updateFormType } = props;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => {
    signIn(values, updateFormType);
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* variant is border
            margin is top bottom*/}
        <TextField
          name="username"
          variant="outlined"
          margin="normal"
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
          fullWidth
          inputRef={register ({
            minLength : {
              value : 8
            }
          })}
          error={!!errors.password}
          helperText={errors.password && "Minimum Length of 8."}
        />
        <Button type="submit" fullWidth variant="outlined">
          Sign In
        </Button>
      </form>
    </div>
  );
}

