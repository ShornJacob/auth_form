import React from 'react'
import {getUser} from './util'
import Button from "@material-ui/core/Button";

export default function User(props) {

    const user = getUser()
    // console.log(user)
    const {logout} = props
    // console.log(logout)
    return (
        <div>
            {user.username}
        <Button
        onClick={logout}
        //this sets full width to true
        fullWidth
        variant="outlined"
      >
        Sign Out
      </Button>
      </div>

    )
}
