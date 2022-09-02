import React from "react";
import { UserT } from "./model/UserT";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { Guest, USER_ROLE } from "./model/sharedTypes";

type Props = {
  currentUser: UserT;
  setCurrentUser(user: UserT): void;
};

const Header = ({ currentUser, setCurrentUser }: Props) => {
  const navigate = useNavigate();
  //edit current user profile
  const handleEditProfile = () => {
    navigate("/edit", { state: { user: currentUser } });
  };
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
            {currentUser.id
              ? `Hello ${currentUser.firstName}! You're logged in as ${
                  USER_ROLE[currentUser.role]
                }`
              : "Use the button to Login or Register..."}
          </Typography>

          {
            /* fix check when you get ID, pls */ currentUser.id === 0 ? (
              <Button color="primary">
                <Link style={{ textDecoration: "none" }} to="/login">
                  Login or register
                </Link>
              </Button>
            ) : (
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  onClick={() => {
                    setCurrentUser(Guest as UserT);
                    localStorage.clear();
                  }}
                >
                  Logout
                </Button>
              </Link>
            )
          }

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
