import React, { useState } from 'react'
import {Button,TextField,FormControl,FormLabel,RadioGroup,FormControlLabel, Radio} from '@mui/material';
import { UserT } from './model/UserT';

import { UserListener, USER_GENDER } from '../sharedTypes';


type Props = {
    userP:UserT;
    onEditUser:UserListener;
    onRegisterUser:UserListener;
}

const RegisterForm = ({userP,onRegisterUser,onEditUser}:Props) => {
    const [user,setUser] = useState({} as UserT);
    const handleSubmit = (event:React.MouseEvent) => {
        event.preventDefault();
        (userP.id)? onEditUser(user):onRegisterUser(user);
    }
    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        setUser(old => ({...old,[fieldName]: event.target.value}) as unknown as UserT);
    }
  return (
    <div className = "register-form">
        <FormControl>
    <TextField name = "username" onChange={handleFieldChange} id="text-username" label="Username" variant="outlined" type="required"/>
    <TextField name = "password" onChange={handleFieldChange} id="text-password" label="Password" variant="outlined" type="password"/>
    <TextField name = "firstName" onChange={handleFieldChange}  id="text-firstname" label="First Name" variant="outlined" />
    <TextField name = "lastName" onChange={handleFieldChange}  id="text-lastname" label="Last Name" variant="outlined" />
    <TextField name = "avatar" onChange={handleFieldChange}  id="text-avatar" label="Avatar URL" variant="outlined" />
    <TextField name ="description" onChange={handleFieldChange}  id="text-description" label="Description(Optional)" variant="outlined" />
    <FormLabel  id="radio-gender-label">Gender</FormLabel>
    <RadioGroup 
    aria-labelledby="radio-gender"
    defaultValue="male"
  >
    <FormControlLabel name="gender" value="f" control={<Radio onChange={handleFieldChange} />} label="Female" />
    <FormControlLabel name="gender" value="m" control={<Radio onChange={handleFieldChange} />} label="Male" />
  </RadioGroup>
  <Button variant="contained" type="submit" onClick = {handleSubmit}>Register</Button>
  </FormControl>
    </div>
  )
}
export default RegisterForm;