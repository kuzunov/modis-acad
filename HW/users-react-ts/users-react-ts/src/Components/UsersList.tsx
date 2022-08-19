import React from 'react'
import { UserT } from './model/UserT'
import User from './User'

type UListP= {
    users:UserT[]
}

const UsersList = ({users}: UListP) => {
  return ( <>
    {users.map(user=><User user={user}/>)}
    </>
  )
}

export default UsersList