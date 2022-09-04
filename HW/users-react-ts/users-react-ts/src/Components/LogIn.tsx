import React, { BaseSyntheticEvent} from "react";
import { Box, Button} from "@mui/material";
import { Guest, UserListener } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserFormInputTextField from "./UserFormInputTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { USER_LOGIN_SCHEMA } from "../config";
import SendIcon from '@mui/icons-material/Send';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


type Props = {
  handleLogin: UserListener;
};
type loginFormInput = {
  username:string,
  password:string,
}

const LogIn = ({ handleLogin }: Props) => {  
  const navigate = useNavigate();
  const { control, handleSubmit, formState: {errors,isValid} } = useForm<loginFormInput>({
    defaultValues: {username:"",password:""},
    mode: 'onChange',
    resolver: yupResolver(USER_LOGIN_SCHEMA),
});


const onSubmit = (data: loginFormInput, event: BaseSyntheticEvent<object, any, any> | undefined) => {
  event?.preventDefault();
    if (data.username && data.password) {
      const user = {
        username: data.username,
        password: data.password,
      } as UserT;
      handleLogin(user);
    }
  };
  const onRegister = ()=> {
    navigate("/register", { state: { user: Guest } });
  };
  return (
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
    onSubmit={handleSubmit(onSubmit)}
>
    <UserFormInputTextField name='username' label='Username' control={control} error={errors.username?.message} />
    <UserFormInputTextField name='password' label='Password' password control={control} error={errors.password?.message} />
    <Button variant="contained" endIcon={<SendIcon />} color='success' type='submit' disabled={!isValid}>
                Log in
            </Button>
        <Button variant="contained" endIcon={<AppRegistrationIcon />} onClick = {onRegister}type='button'>
            Register
          </Button>
    </Box>
  );
};

export default LogIn;
