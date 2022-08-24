import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,

} from "@mui/material";
import { UserT } from "./model/UserT";

import {
  Guest,
  UserListener,
  USER_ROLE,
  USER_STATUS,
} from "./model/sharedTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { validation } from "../config";

type Props = {
  currentUser: UserT;
  onEditUser: UserListener;
  onRegisterUser: UserListener;
  setError: (err: any) => void;
};
type LocationState = { user: UserT };

const UserForm = ({
  currentUser,
  onRegisterUser,
  onEditUser,
  setError,
}: Props) => {
  const [user, setUser] = useState<UserT>(Guest);
  const location = useLocation();
  const navigate = useNavigate();
  //check if editing user?
  useEffect(() => {
    if (location.state) {
      const locationState = location.state as LocationState;
      const passedUser = locationState.user;
      setUser(passedUser);
    }
  }, [location.state]);
  //validate user fields and user for registration or editing
  const handleSubmit = (event: React.MouseEvent) => {
    if (user){
    event.preventDefault();
    if (validate(user)) {
      setError("");
      user.id ? onEditUser(user) : onRegisterUser(user);
    } else {
      setError("Invalid user input.");
    }
  }
  };
  //validate fn; returns bool
  const validate = (user: UserT) => {
    //get field names for validation
    let fields = Object.keys(validation);
    let isValid: boolean = true;
    //for each field -> test value with validation regex in config.ts
    fields.forEach((field) => {
      if (
        (field === "description" || field === "avatar") &&
        user[field] === ""
      ) {
        isValid = isValid && true;
      } else {
        isValid =
          validation[field as keyof typeof validation].test(user[field]) &&
          isValid;
      }
    });

    return isValid;
  };
  const handleCancel = () => {
    navigate("/");
  };
  //bind change to state
  const handleFieldChange = (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | SelectChangeEvent<USER_STATUS>
      | SelectChangeEvent<USER_ROLE>
  ) => {
    const fieldName = event.target.name;
    setUser(
      (old) => ({ ...old, [fieldName]: event.target.value } as unknown as UserT)
    );
  };
  return ( (user)?
    <div className="user-form">
      <TextField
        name="username"
        onChange={handleFieldChange}
        error={!validation.username.test(user.username)}
        id="text-username"
        label="Username"
        helperText="Should be between 5 and 15 letters (lower or upper case); cannot be changed"
        variant="outlined"
        type="required"
        value={user.username}
        disabled={user.id === currentUser.id && user.id ? true : false}
      />
      <TextField
        name="password"
        onChange={handleFieldChange}
        error={!validation.password.test(user.password)}
        id="text-password"
        label="Password"
        helperText="Should be at least 8 characters (one digit and one special character) "
        variant="outlined"
        type="password"
        disabled={user.id !== currentUser.id ? true : false}
        value={user.password}
      />
      <TextField
        name="firstName"
        onChange={handleFieldChange}
        helperText="Should be between 2 and 15 letters"
        error={!validation.firstName.test(user.firstName)}
        id="text-firstname"
        label="First Name"
        variant="outlined"
        type="required"
        value={user.firstName}
      />
      <TextField
        name="lastName"
        onChange={handleFieldChange}
        helperText="Should be between 2 and 15 letters"
        error={!validation.lastName.test(user.lastName)}
        id="text-lastname"
        label="Last Name"
        variant="outlined"
        type="required"
        value={user.lastName}
      />
      <TextField
        name="avatar"
        onChange={handleFieldChange}
        helperText="Should be a valid image url (jpg or png)"
        error={user.avatar ? !validation.avatar.test(user.avatar) : false}
        id="text-avatar"
        label="Avatar URL"
        variant="outlined"
        value={user.avatar}
      />
      <TextField
        name="description"
        onChange={handleFieldChange}
        helperText="Max 512 characters"
        error={
          user.description
            ? !validation.description.test(user.description)
            : false
        }
        id="text-description"
        label="Description(Optional)"
        variant="outlined"
        value={user.description || ''}
      />
      <FormLabel id="radio-gender-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="radio-gender"
        defaultValue="m"
        onChange={handleFieldChange}
      >
        <FormControlLabel
          name="gender"
          value="f"
          control={<Radio checked={user.gender === "f"} />}
          label="Female"
        />
        <FormControlLabel
          name="gender"
          value="m"
          control={<Radio checked={user.gender === "m"} />}
          label="Male"
        />
      </RadioGroup>
      {currentUser.role === 2 && (
        <>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="user-status-label"
            id="user-status"
            value={user.status}
            label="Status"
            name="status"
            onChange={handleFieldChange}
          >
            <MenuItem value={USER_STATUS.ACTIVE}>Active</MenuItem>
            <MenuItem value={USER_STATUS.DEACTIVATED}>Deactivated</MenuItem>
            <MenuItem value={USER_STATUS.SUSPENDED}>Suspended</MenuItem>
          </Select>
          <Select
            labelId="user-role-label"
            id="user-role"
            value={user.role}
            label="Role"
            name="role"
            onChange={handleFieldChange}
          >
            <MenuItem value={USER_ROLE.ADMIN}>Admin</MenuItem>
            <MenuItem value={USER_ROLE.USER}>User</MenuItem>
          </Select>
        </>
      )}
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        {user.id ? "Edit" : "Register"}
      </Button>
      <Button variant="contained" type="submit" onClick={handleCancel}>
        {"Cancel"}
      </Button>
    </div>:
    <div className='errors'>Invalid User passed. Return to home.<Button onClick={()=>{navigate('/')}}>Home</Button></div>
  );
};
export default UserForm;
