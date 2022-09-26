import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

const Profile = (props: Props) => {
  const {userId} = useParams();
  return (<>
    Profile of {userId}
    </>
  )
}

export default Profile