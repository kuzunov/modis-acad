import React, { BaseSyntheticEvent, FormEvent} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { USER_FORM_SCHEMA } from "../config";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Box,
  InputLabel,

} from "@mui/material";
import { UserT } from "./model/UserT";

import {
  UserListener,
  USER_GENDER,
  USER_ROLE,
  USER_STATUS,
} from "./model/sharedTypes";
import { useLocation, useNavigate} from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import UserFormInputTextField from "./UserFormInputTextField";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type Props = {
  currentUser: UserT;
  onEditUser: UserListener;
  onRegisterUser: UserListener;
  setError: (err: any) => void;
};
type FormData = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  description: string;
  gender: USER_GENDER;
  role: USER_ROLE;
  status: USER_STATUS
};
type LocationState = { user: UserT };

const UserForm = ({
  currentUser,
  onRegisterUser,
  onEditUser,
  setError,
}: Props) => {
  // const [user, setUser] = useState<UserT>(Guest);
  const location = useLocation();
  const navigate = useNavigate();
  //check if editing user?
  const determineUser = () => {
    if (location.state) {
      const locationState = location.state as LocationState;
      const passedUser = locationState.user;

      return passedUser;
    }
      else {
        return undefined;
    }
  }
  const { control, getValues, handleSubmit, reset, formState: {errors,isValid} } = useForm<FormData>({
    defaultValues: determineUser(),
    mode: 'onChange',
    resolver: yupResolver(USER_FORM_SCHEMA),
});
  
  //validate user fields and user for registration or editing
  const onSubmit = (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
    event?.preventDefault();
    if (data.role === USER_ROLE.GUEST)
    {
      const userToReg = { ...data} as unknown as UserT;
      onRegisterUser(userToReg) ;
    } else {
      const userToEdit = { ...data} as unknown as UserT;
      onEditUser(userToEdit);

    }
  }
  const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
}
  const handleCancel = () => {
    navigate("/");
  };
  return ((getValues("id")>=0)?
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
  <UserFormInputTextField name='id' label='ID' control={control} disabled size='small'/>
  <UserFormInputTextField name='username' label='Username' control={control} error={errors.username?.message} />
  <UserFormInputTextField name='password' label='Password' control={control} password disabled={getValues("id") !== currentUser.id ? true : false} error={errors.password?.message}/>
  <UserFormInputTextField name='firstName' label='First Name' control={control}error={errors.firstName?.message}/>
  <UserFormInputTextField name='lastName' label='Last Name' control={control} error={errors.lastName?.message}/>
  <UserFormInputTextField name='avatar' label='Avatar' control={control} error={errors.avatar?.message}/>
  <UserFormInputTextField name='description' label='Description' control={control} error={errors.description?.message}/>
  <Controller 
    control = {control}
    name= "gender"
    rules = {{required:true}}
    render = {({field}) => (
      <InputLabel>Gender
    <RadioGroup
      {...field}
      defaultValue={getValues("gender") === "f"?"f":"m"}
    >
      <FormControlLabel
        value="f"
        control={<Radio />}
        label="Female"
      />
      <FormControlLabel
        value="m"
        control={<Radio />}
        label="Male"
      />
    </RadioGroup>
    </InputLabel>)}
  />
  
  
      {currentUser.role === 2 && (
        <>
        <InputLabel>Status: 
          <Controller control = {control}
            name = "status"
            rules = {{required:true}}
            render = {({field}) => (
              
              <Select
                {...field}
                id="user-status"
                defaultValue={getValues("status")}
                label="Status"
                >
                        <InputLabel>Status</InputLabel>

            <MenuItem value={USER_STATUS.ACTIVE}>Active</MenuItem>
            <MenuItem value={USER_STATUS.DEACTIVATED}>Deactivated</MenuItem>
            <MenuItem value={USER_STATUS.SUSPENDED}>Suspended</MenuItem>
          </Select>
            )} />
          </InputLabel>
          <InputLabel>Role: 
          <Controller control = {control}
            name = "role"
            rules = {{required:true}}
            render = {({field}) => (
              <Select {...field}
                id="user-role"
                defaultValue={getValues("role")}
                label="Role"
              >
            <MenuItem value={USER_ROLE.ADMIN}>Admin</MenuItem>
            <MenuItem value={USER_ROLE.USER}>User</MenuItem>
          </Select> 
          )} /></InputLabel>
          
        </>
      )}
            <Button variant="contained" endIcon={<SendIcon />} disabled={!isValid} type='submit'>
                Submit
            </Button>
            <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                Reset
            </Button>
            <Button variant="contained" endIcon={<ExitToAppIcon />} onClick={handleCancel} color='error'>
                    Cancel
                  </Button>
            </Box>
    :<div className='errors'>Invalid User passed. Return to home.<Button endIcon={<ExitToAppIcon />}onClick={()=>{navigate('/')}}>Home</Button></div>
  );
};
export default UserForm;
