import { height, width } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import EventController from '../events/EventController'
import EventList from '../events/EventList'
import MapHOC from '../maps/MapHOC'
import OrganizationsController from '../oragnizations/OrganizationsController'

type Props = {}

const Dashboard = (props: Props) => {
  return ( 
    // <MapHOC center={{
    //     lat: 0,
    //     lng: 0,
    //   }} style={{width:"40vw", height:"35vh"}}
    //   zoom={3}
    //   markers={[
    //     {
    //         position:{
    //             lat: 0,
    //             lng: 0,
    //         }
    //     }
    // ]}
    //   />
    <>
      <EventController displ={"dash"} />
      <OrganizationsController/>
    </>
  )
}

export default Dashboard