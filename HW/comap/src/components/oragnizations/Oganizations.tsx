import { Grid } from '@mui/material'
import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { IOrganization } from '../../model/organization'
import { IdType } from '../../model/sharedTypes'
import { IUser } from '../../model/user'
import Organization from './Organization'

type Props = {  }

const Oganizations = ({}: Props) => {
  const organizations = useLoaderData() as IOrganization[]

  return (
    <Grid container spacing={2}>    
          {(organizations)?organizations.map(organization=>
          <Grid key={organization.id} item xs={4}><Organization  {...organization}/></Grid>):<>No organizations to show at the moment.</>
          }
          <Outlet />
  </Grid>
  )
}

export default Oganizations