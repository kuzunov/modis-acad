import React, { useRef } from "react";
import { Button, TextField, FormControl } from "@mui/material";
import { UserListener } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import { Link } from "react-router-dom";

type Props = {
  handleLogin: UserListener;
};

const LogIn = ({ handleLogin }: Props) => {
  //refs for fields
  const usnmRef = useRef<HTMLInputElement>();
  const pwdRef = useRef<HTMLInputElement>();
  //build partial user for logging in
  const handleSubmit = (e: React.MouseEvent) => {
    if (usnmRef.current && pwdRef.current) {
      const user = {
        username: usnmRef.current.value,
        password: pwdRef.current.value,
      } as UserT;
      handleLogin(user);
    }
  };
  return (
    <div className="register-form">
        <TextField
          inputRef={usnmRef}
          id="text-username"
          label="Username"
          variant="outlined"
          type="required"
        />
        <TextField
          inputRef={pwdRef}
          id="text-password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Log in
        </Button>
        <Link to="/register">
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Link>
    </div>
  );
};

export default LogIn;
