import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

export default function SignIn(props) {

  const {signIn, updateFormState } = props

  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>

      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email Address"
          name="username"
          autoComplete="email"
          onChange={e => {
            e.persist();
            updateFormState(e);
          }}
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={e => {
            e.persist();
            updateFormState(e);
          }}
        />

        <Button
          onClick={signIn}
          //this sets full width to true
          fullWidth
          variant="outlined"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

//https://material-ui.com/api/typography/
//component - The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component.

//variant - Applies the theme typography styles.

//https://www.w3schools.com/tags/att_form_novalidate.asp
