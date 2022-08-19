import React, { useContext, useState } from 'react'
import { USER_GENDER, USER_ROLE, USER_STATUS} from '../sharedTypes';
import { UserT } from './model/UserT';
import {Card, CardActions, CardContent, CardMedia,Button,Typography} from '@mui/material';
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from '../config';
import { UserContext } from '../App';

export type UserP = {
    user:UserT
}

const User = ({user}: UserP) => {
const currentUser = useContext(UserContext);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image ={user.avatar||DEFAULT_AVATAR+user.gender+".jpg"}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.firstName} {user.lastName} is {USER_ROLE[user.role]} and is {USER_STATUS[user.status]}
        </Typography>
      </CardContent>
      {(currentUser.user.role === 2) && <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>}
    </Card>
  )
}

export default User