import { Backdrop, Card, CardMedia, CardContent, Typography, CardActions, Button, Box, TextField, Autocomplete } from '@mui/material';
import React, { BaseSyntheticEvent, FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { IEvent } from '../../model/event';
import { IUser } from '../../model/user';
import MapHOC from '../maps/MapHOC';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import UserFormInputTextField from '../users/UserFormInputTextField';
import { EventsApi } from '../../service/rest-api-client';

type Props = {
  event?:IEvent
}
type FormData = {
  id:number;
  name:string,
  date:string,
  organizer:IUser,
  poster:string,
  description:string,
  locations:google.maps.MarkerOptions[],
  participants: IUser[]
};

const AddEvent = (props: Props) => {
  const navigate = useNavigate();
  const loaderEvent = useLoaderData() as IEvent;

  const determineEvent = () => {
    const newEvent = {
      id:undefined,
      name:"",
      date:"",
      organizer:{} as IUser,
      poster:"",
      description:"",
      locations:[] as google.maps.MarkerOptions[],
      participants:[] as IUser[],       
    } as IEvent;
    return (loaderEvent)?loaderEvent:newEvent;
  }
    const [open, setOpen] = useState(false);
    let markers:google.maps.MarkerOptions[] = [];
    const { control, getValues, handleSubmit, reset, formState: {errors,isValid} } = useForm<FormData>({
      defaultValues: determineEvent(),
      mode: 'onChange',
      // resolver: yupResolver(USER_FORM_SCHEMA),
  })
    const handleClose = () => {
      setOpen(false);
      navigate(-1);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    const onReset = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      reset();
    }
    const updateMarkerArray = (mapMarkers:google.maps.MarkerOptions[]) => {
      markers=mapMarkers;
    };
    useEffect(()=>{
        handleToggle();
        markers = (loaderEvent)?loaderEvent.locations:[];
    },[])
   const onSubmit = (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
    event?.preventDefault();
    data.locations = markers;
    (loaderEvent)?EventsApi.update(data):EventsApi.create(data)
    navigate(-1);
  }

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
    {/* <ClickAwayListener onClickAway={handleClose}> */}
    <Card sx={{ width: "50%", maxHeight:"90%", overflowY:"auto"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
    <Box
    component="form"
    sx={{
        padding: '20px',
        '& .MuiTextField-root': { m: 1, width: 'calc(100% - 20px)' },
        '& .MuiButton-root': { m: 1, width: '25ch' },
        '& .MuiInputLabel-root': {m:1, margin: '5px'},
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(onSubmit)} onReset={onReset}
>
      <CardContent >
      <UserFormInputTextField name='name' label='Name' control={control} error={errors.name?.message} />
      <UserFormInputTextField name='description' label='Description' control={control} error={errors.description?.message} />
      <UserFormInputTextField name='poster' label='Poster' control={control} error={errors.poster?.message} />
      <UserFormInputTextField name='date' label='Date' type="datetime-local" control={control} error={errors.poster?.message} />
      <MapHOC center={{ lat: -34.397, lng: 150.644 }} zoom={15} markers={[]} style={{width:"500px", height:"300px"}} updateMarkerArray={updateMarkerArray} editable/>
      </CardContent>
      <CardActions>
      <Button variant="contained" endIcon={<SendIcon />} disabled={!isValid} type='submit'>
                Submit
            </Button>
            <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                Reset
            </Button>
      </CardActions>
      </Box>
    </Card>
    {/* </ClickAwayListener> */}
    </Backdrop>
  )
  }
export default AddEvent