import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { mockEevents } from '../../mock-data';
import { IEvent } from '../../model/event';
import { EventsApi } from '../../service/rest-api-client';
import EventList from './EventList'


type Props = {
  displ:"dash"|undefined,
  eventsToDisplay?:IEvent[]}

const EventController = ({eventsToDisplay,displ}: Props) => {
  //const [events, setEvents] = useState<IEvent[]>();
  const navigate = useNavigate();
  // const dashEvents = () => {
  //   setEvents(mockEevents.slice(0,3));
  // };
  const addEvent = () => {
    navigate("/events/add")
  }
  const events = useLoaderData() as IEvent[]
  // useEffect(()=>{
  //   setEvents(eventsL);
  // },[]);
  return (
  <Container sx={{margin:"20px"}}>
    <Button variant="contained" sx={{color:"white",margin:"5px 0px"}} onClick={addEvent}>Add New Event</Button>
    <EventList events={events} />
  </Container>
  )
}

export default EventController