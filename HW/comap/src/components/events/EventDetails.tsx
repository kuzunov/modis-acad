import Backdrop from '@mui/material/Backdrop/Backdrop';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { IEvent } from '../../model/event';

type Props = {}

const EventDetails = (props: Props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
      navigate(-1);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    useEffect(()=>{
        handleToggle();
    },[])
    const event = useLoaderData() as IEvent;
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
    <div>{event.name}</div>
    </Backdrop>
  )
}

export default EventDetails