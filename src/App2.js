//https://react-hook-form.com/get-started

import React from 'react'
import useForm from 'react-hook-form'
import TextField from "@material-ui/core/TextField";

export default function App() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  console.log(watch('example')) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <TextField name="example" defaultValue="test" inputRef={register} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <TextField name="exampleRequired" inputRef={register({ required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <TextField type="submit" />
    </form>
  )
}

//Each field is required to have a unique name as a key for the registration process.
//https://material-ui.com/api/text-field/
//inputRef is used to Pass a a ref to yje input element