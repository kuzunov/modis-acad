import { Grid } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IEvent } from '../../model/event'
import Event from "./Event"

type EventListProps = {
    events?:IEvent[]
}

const EventList = ({events}: EventListProps) => {
  
  return (<Grid container spacing={2}>
          <Outlet />
          {(events)?events.map(event=>
          <Grid item xs={4}><Event key={event.id} {...event}/></Grid>):<>No Ongoing Events</>}
  </Grid>
  )
}

export default EventList;