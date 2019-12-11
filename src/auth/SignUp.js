import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import useAuthStyles from "./style";
import SimpleSnackbar from "../components/Snackbar";
import {Auth}  from "aws-amplify";
import { navigate } from "@reach/router"



export default () => {

    const classes = useAuthStyles();
  
    const [snackbarMsg, updatesnackbarMsg] = useState(null)

    const { register, handleSubmit, errors, watch } = useForm()

    const onSignUp = values => {
        // console.log(values)
        signUp(values)
       
      }

    async function signUp({username, password} ) {

        try {
          await Auth.signUp({
            username, password
          })
      
          console.log('sign up success!')
          //https://reach.tech/router/api/navigate
          // // put some state on the location
          //https://github.com/reach/router/issues/96
          navigate("/confirmsignup", 
          {state : { 
            username,
            msg : "An AuthCode has been send to the submitted email. Please confirm AuthCode."
           }})
      
        } catch (err) {
          //the error boject 
          updatesnackbarMsg(err.message)
        }
      }


      //Required is required, Or else it will pass a blank field"

      //https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext
      return (
        <div className={classes.paper}  >
          {/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles */}
          <Typography component="h1" variant="h5" role="heading" >
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

            <Button  className={classes.submit} type="submit" fullWidth variant="outlined">
              Sign Up
            </Button>
          </form>          
    
          {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
         
        </div>
      );
    };

