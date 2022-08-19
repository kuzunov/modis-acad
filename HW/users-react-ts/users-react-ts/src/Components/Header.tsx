import React, { useContext } from 'react'
import { UserT } from './model/UserT';
import {AppBar,Container,Toolbar, Typography,Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from '../App';
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from '../config';
import { Link } from "react-router-dom";



const Header = () => {
    const currentUser = useContext(UserContext);
    console.log(currentUser.user.avatar||APP_URL+AVATAR_FOLDER+DEFAULT_AVATAR+currentUser.user.gender+".jpg")
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
          >
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {(currentUser.user.id)?`Hello ${currentUser.user.username}`:"Use the button to Login or Register..."}
        </Typography>
        <Link to="/login"><Button color="inherit">Login</Button></Link>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton 
            // onClick={handleOpenUserMenu}
             sx={{ p: 0 }}>
              <Avatar alt="" src={currentUser.user.avatar||(APP_URL+AVATAR_FOLDER+DEFAULT_AVATAR+currentUser.user.gender+".jpg")} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default Header