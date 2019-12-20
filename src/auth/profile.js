import React from 'react'
import {getUser} from './util'

export default function Profile() {

    const user = getUser()

    // console.log(user)
    return (
        <div>
            {user.username}
        </div>
    )
}
