

import React, { useContext } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import {Link as RouterLink} from 'react-router-dom';
import { UserContext } from '../UserContext';
import { USER_ROLE } from '../../model/user';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from "../../evn.var.config";
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

type Props = {}

const Header = (props: Props) => {
  const {currentUserState} = useContext(UserContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentUserState.isLoggedIn
              ? `Hello ${currentUserState.currentUser.username}! You're logged in as ${
                  USER_ROLE[currentUserState.currentUser.role]
                }`
              : "Use the button to Login or Register..."}
          </Typography>
            {!currentUserState.currentUser.isLoggedin? (
              <IconButton>
                <RouterLink style={{ textDecoration: "none" }} to="/login" onClick={()=>{}}>
                  <LoginIcon />
                </RouterLink>
              </IconButton>
            ) : (
              <RouterLink to="/">
                <IconButton onClick={() => {
                  }}>
                  <LogoutIcon/>
                </IconButton>
              </RouterLink>
            )
          }

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Edit Profile">
              <IconButton component={RouterLink} to='profile' sx={{ p: 0 }}>
                <Avatar
                  alt=""
                  src={
                    currentUserState.currentUser.avatar ||
                    APP_URL +
                      AVATAR_FOLDER +
                      DEFAULT_AVATAR +
                      currentUserState.currentUser.gender +
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
}

export default Header