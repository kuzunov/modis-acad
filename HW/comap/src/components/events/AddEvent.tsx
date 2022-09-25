import { Backdrop, Card, CardMedia, CardContent, Typography, CardActions, Button, Box, TextField, Autocomplete } from '@mui/material';
import React, { BaseSyntheticEvent, FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { IEvent } from '../../model/event';
import { IUser } from '../../model/user';
import MapHOC from '../maps/MapHOC';
import UserFormInputTextField from '../users/UserFormInputTextField';

type Props = {}
type FormData = {
  id:number;
  name:string,
  date:string,
  organizer:IUser,
  poster:string,
  description:string,
  location:google.maps.MarkerOptions[],
  participants: IUser[]
};

const AddEvent = (props: Props) => {
  const navigate = useNavigate();
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
    return newEvent;
  }
    const [open, setOpen] = useState(false);
    // const [markers, setMarkers] = React.useState<google.maps.MarkerOptions[]>([]);
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

    useEffect(()=>{
        handleToggle();
    },[])
  //  const addMarker = (e:google.maps.MapMouseEvent) => {
  //   setMarkers([...markers, {position: {lat: e.latLng!.lat(), lng: e.latLng!.lng()}}]);
  //  };
   const onSubmit = (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
    event?.preventDefault();
    // if (data.role === USER_ROLE.GUEST)
    // {
    //   const userToReg = { ...data} as unknown as UserT;
    //   onRegisterUser(userToReg) ;
    // } else {
    //   const userToEdit = { ...data} as unknown as UserT;
    //   onEditUser(userToEdit);

    // }
  }
   const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
}
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
    {/* <ClickAwayListener onClickAway={handleClose}> */}
    <Card sx={{ width: "50%", height:"70%"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
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
      <CardContent>
      <UserFormInputTextField name='name' label='Name' control={control} error={errors.name?.message} />
      <UserFormInputTextField name='description' label='Description' control={control} error={errors.description?.message} />
      <UserFormInputTextField name='poster' label='Poster' control={control} error={errors.poster?.message} />
      <UserFormInputTextField name='date' label='Date' type="datetime-local" control={control} error={errors.poster?.message} />
      <MapHOC center={{ lat: -34.397, lng: 150.644 }} zoom={15} markers={[]} style={{width:"500px", height:"300px"}} editable/>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
      </Box>
    </Card>
    {/* </ClickAwayListener> */}
    </Backdrop>
  )
  }
export default AddEvent