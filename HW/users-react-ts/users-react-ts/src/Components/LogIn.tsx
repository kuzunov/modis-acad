import React, { BaseSyntheticEvent, useRef, useState } from "react";
import { Box, Button, TextField} from "@mui/material";
import { UserListener } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserFormInputTextField from "./UserFormInputTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { USER_FORM_SCHEMA, USER_LOGIN_SCHEMA } from "../config";
import SendIcon from '@mui/icons-material/Send';


type Props = {
  handleLogin: UserListener;
};
type loginFormInput = {
  username:string,
  password:string,
}

const LogIn = ({ handleLogin }: Props) => {  
  const { control, handleSubmit, formState: {errors } } = useForm<loginFormInput>({
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
    <Button variant="contained" endIcon={<SendIcon />} type='submit'>
                Log in
            </Button>
        <Link to="/register">
          <Button variant="contained" type="button">
            Register
          </Button>
        </Link>
    </Box>
  );
};

export default LogIn;
