import React, { useState } from "react";
import { UserT } from "./model/UserT";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { Guest, USER_ROLE } from "./model/sharedTypes";

type Props = {
  currentUser: UserT;
  setCurrentUser(user: UserT): void;
};

const Header = ({ currentUser, setCurrentUser }: Props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  //edit current user profile
  const handleEditProfile = () => {
    (currentUser!==Guest)?navigate("/edit", { state: { user: currentUser } }):setErrors("You must be logged in.");
  };
  const returnHome = () => {
    setErrors("")
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            onClick = {returnHome}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            
          >
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentUser.id
              ? `Hello ${currentUser.firstName}! You're logged in as ${
                  USER_ROLE[currentUser.role]
                }`
              : "Use the button to Login or Register..."}
          </Typography>
          {(!currentUser.id)&&errors}
          {
            /* fix check when you get ID, pls */ currentUser.id === 0 ? (
              <IconButton>
                <Link style={{ textDecoration: "none" }} to="/login" onClick={()=>{setErrors("")}}>
                  <LoginIcon />
                </Link>
              </IconButton>
            ) : (
              <Link to="/">
                <IconButton onClick={() => {
                    setCurrentUser(Guest);
                    localStorage.clear();
                  }}>
                  <LogoutIcon/>
                </IconButton>
              </Link>
            )
          }

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Edit Profile">
              <IconButton onClick={handleEditProfile} sx={{ p: 0 }}>
                <Avatar
                  alt=""
                  src={
                    currentUser.avatar ||
                    APP_URL +
                      AVATAR_FOLDER +
                      DEFAULT_AVATAR +
                      currentUser.gender +
                      ".jpg"
                  }
                ></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
