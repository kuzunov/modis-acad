import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Form, Link, Navigate, useNavigate } from 'react-router-dom'
import { IEvent } from '../../model/event'


const Event = ({name,date,organizer,poster,participants,id}: IEvent) => {
  const navigate=useNavigate();
  const onDelete = () => {
    navigate(`/events/${id}/delete`);
  }
  return (
    <Card>
      <Link to={`/events/${id}`}>
      <CardActionArea>
      <CardMedia
      image={poster}
      component="img"
      height="140"
      >
      </CardMedia>
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Form method="delete" action={`delete/${id}`}>
        <Button type="submit" size="small">DELETE</Button>
        </Form>
      </CardActions>
    </Card>
  )
}

export default Event