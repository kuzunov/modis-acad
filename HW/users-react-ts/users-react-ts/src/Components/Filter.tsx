import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { FilterT, USER_ROLE, USER_STATUS } from "./model/sharedTypes";

type Props = {
  filter: FilterT;
  handleFilterChange: (filter: FilterT) => void;
};

const Filter = ({ filter, handleFilterChange }: Props) => {
  //update state on filter change
  const handleFieldChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | SelectChangeEvent<USER_STATUS>
      | SelectChangeEvent<USER_ROLE>
  ) => {
    const fieldName = event.target.name;
    handleFilterChange({
      ...filter,
      [fieldName]: event.target.value === "0" ? undefined : event.target.value,
    } as unknown as FilterT);
  };
  return (
    <>
      <Select
        labelId="user-status-label"
        id="user-status"
        value={filter.status}
        label="Status"
        name="status"
        variant="outlined"
        onChange={handleFieldChange}
      >
        <MenuItem value={0}>All</MenuItem>
        <MenuItem value={1}>Active</MenuItem>
        <MenuItem value={2}>Suspended</MenuItem>
        <MenuItem value={3}>Deactivated</MenuItem>
      </Select>
      <Select
        labelId="user-role-label"
        id="user-role"
        value={filter.role}
        label="Role"
        name="role"
        variant="outlined"
        onChange={handleFieldChange}
      >
        <MenuItem value={0}>All</MenuItem>
        <MenuItem value={2}>Admin</MenuItem>
        <MenuItem value={1}>User</MenuItem>
      </Select>
    </>
  );
};

export default Filter;
