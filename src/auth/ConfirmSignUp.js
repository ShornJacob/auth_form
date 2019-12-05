import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import useAuthStyles from "./style";
import SimpleSnackbar from "../components/Snackbar";
import {Auth}  from "aws-amplify";
import { navigate } from "@reach/router"



export default (props) => {

  //https://reach.tech/router/api/navigate
  // read the location state
  ////https://github.com/reach/router/issues/96
  //&& const {username,msg} = props.location.state

  let username = ""
  let msg = null

   if (!!props.location.state && !!props.location.state.username ) {
    username = props.location.state.username
   } 

   if (!!props.location.state && !!props.location.state.msg ) {
     msg = props.location.state.msg
   }

  // console.log(username,msg)

    const classes = useAuthStyles();
  
    const [snackbarMsg, updatesnackbarMsg] = useState(msg)

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
          navigate("/confirmsignup")
      
        } catch (err) {
          console.log('error signing up..', err)
          updatesnackbarMsg(err.message)
        }
      }


      //Required is required, Or else it will pass a blank field"

      return (
        <div>
          <Typography component="h1" variant="h5">
            Confirm code
          </Typography>
          <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit(onSignUp)}>
            {/* variant is border
                  margin is top bottom*/}
            <TextField
            defaultValue={username}
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

           

            <Button  className={classes.submit} type="submit" fullWidth variant="outlined">
              Sign Up
            </Button>
          </form>          </div>
    
          {snackbarMsg ? <SimpleSnackbar message={snackbarMsg} /> : null}
        </div>
      );
    };