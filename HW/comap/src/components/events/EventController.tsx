import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { mockEevents } from '../../mock-data';
import { IEvent } from '../../model/event';
import EventList from './EventList'


type Props = {}

const EventController = (props: Props) => {
  const [events, setEvents] = useState<IEvent[]>();
  useEffect(() => {
    setEvents(mockEevents);
  }, [])
  
  return (<>
    <EventList events={events} />
    <Outlet />
    </>
  )
}

export default EventController