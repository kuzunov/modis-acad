import { Button, Card, CardActions, CardContent, CardMedia, ClickAwayListener, Container, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { IEvent } from '../../model/event';
import MapHOC from '../maps/MapHOC';

type Props = {}

const EventDetails = (props: Props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
      if (document.referrer && document.referrer.length > 0 && document.referrer.startsWith('http://localhost:3000/events')){
      navigate(-1);}
      else navigate("/dashboard");
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
          <MapHOC center={{ lat: -34.397, lng: 150.644 }} zoom={15} markers={[{position:{ lat: -34.397, lng: 150.644 }, title:event.name}]} style={{width:"500px", height:"300px"}}/>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    {/* </ClickAwayListener> */}
    </Backdrop>
  )
}

export default EventDetails