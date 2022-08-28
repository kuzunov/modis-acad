import React, { useRef, useState } from "react";
import { Button, TextField} from "@mui/material";
import { UserListener } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import { Link } from "react-router-dom";

type Props = {
  handleLogin: UserListener;
};
type loginFormInput = {
  username:string,
  password:string,
}

const LogIn = ({ handleLogin }: Props) => {
  //refs for fields
  // const usnmRef = useRef<HTMLInputElement>();
  // const pwdRef = useRef<HTMLInputElement>();
  const [formInput, setFormInput] = useState<loginFormInput>({username:"",password:""});
  //build partial user for logging in
  // const handleSubmit = (e: React.MouseEvent) => {
  //   if (usnmRef.current && pwdRef.current) {
  //     const user = {
  //       username: usnmRef.current.value,
  //       password: pwdRef.current.value,
  //     } as UserT;
  //     handleLogin(user);
  //   }
  // };
  const handleInputChanage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formInput.username && formInput.password) {
      const user = {
        username: formInput.username,
        password: formInput.password,
      } as UserT;
      handleLogin(user);
    }
  };
  return (

    //do with form!!!!!!!!!!
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <TextField
        name = "username"
          // inputRef={usnmRef}
          id="text-username"
          label="Username"
          variant="outlined"
          type="required"
          value = {formInput.username}
          onChange = {handleInputChanage}
        />
        <TextField
        name = "password"
          // inputRef={pwdRef}
          id="text-password"
          label="Password"
          variant="outlined"
          type="password"
          value = {formInput.password}
          onChange = {handleInputChanage}


        />
        <Button variant="contained" type="submit">
          Log in
        </Button>
        </form>
        <Link to="/register">
          <Button variant="contained">
            Register
          </Button>
        </Link>
    </div>
  );
};

export default LogIn;
