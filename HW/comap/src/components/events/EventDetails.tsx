import { Button, Card, CardActions, CardContent, CardMedia, ClickAwayListener, Container, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import { useEffect, useState } from 'react';
import { Form, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { IEvent } from '../../model/event';
import MapHOC from '../maps/MapHOC';

type Props = {}

const EventDetails = (props: Props) => {
  const {event,local} = useLoaderData() as {event: IEvent, local:boolean};
  const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
      local?navigate(-1):navigate("/events")
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    // useEffect(()=>{
    //     handleToggle();
    // },[])
    
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
    {/* <ClickAwayListener onClickAway={handleClose}> */}
    <Card  sx={{ width: "50%", maxHeight:"800px", overflowY: "auto"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
      <CardMedia
        component="img"
        alt={event.name}
        height="140"
        image={event.poster}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
          <MapHOC center={event.locations[0].position as google.maps.LatLngLiteral} zoom={15} markers={event.locations} style={{width:"500px", height:"300px"}}/>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Form method='get' action={`edit`}>
          <Button type="submit" size="small">Edit</Button>
        </Form>
      </CardActions>
    </Card>
    {/* </ClickAwayListener> */}
    </Backdrop>
  )
}

export default EventDetails