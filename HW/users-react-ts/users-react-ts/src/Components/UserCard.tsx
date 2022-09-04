import React, { useContext } from "react";
import { UserListener, USER_ROLE, USER_STATUS } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from "../config";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export type UserP = {
  user: UserT;
  handleDelete: UserListener;
};

const User = ({ user, handleDelete }: UserP) => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  const onEdit = () => {
    //edit user (ADMINs only)
    navigate("/edit", { state: { user: user } });
  };
  const onDelete = () => {
    //delete user (ADMINs only)
    handleDelete(user);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={
          !user.avatar
            ? APP_URL + AVATAR_FOLDER + DEFAULT_AVATAR + user.gender + ".jpg"
            : user.avatar
        }
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.firstName} {user.lastName} is {USER_ROLE[user.role]} and is {USER_STATUS[user.status]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Account was created on {new Date(user.registered).toLocaleString("bg-BG")} and was last edited on {new Date(user.modified).toLocaleString("bg-BG")}
        </Typography>
      </CardContent>
      {currentUser.role === 2 && (
        <CardActions>
          <Button size="small" onClick={onEdit}>
            Edit
          </Button>
          <Button size="small" onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default User;
