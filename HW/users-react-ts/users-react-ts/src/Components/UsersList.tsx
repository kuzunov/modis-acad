import React from "react";
import { FilterT, UserListener } from "./model/sharedTypes";
import { UserT } from "./model/UserT";
import User from "./User";

type UListP = {
  users: UserT[];
  handleDelete: UserListener;
  filter: FilterT;
};

const UsersList = ({ users, filter, ...rest }: UListP) => {
  return (
    <div className="users-list">
      {users
        .filter((user) => (!filter.role ? true : user.role === filter.role))
        .filter((user) =>
          !filter.status ? true : user.status === filter.status
        )
        .map((user) => (
          <User key={user.id} user={user} {...rest} />
        ))}
    </div>
  );
};

export default UsersList;
