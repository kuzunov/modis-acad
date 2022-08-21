import { UserT } from "./UserT";

export enum USER_STATUS {
  ACTIVE = 1,
  SUSPENDED,
  DEACTIVATED,
}
export enum USER_ROLE {
  USER = 1,
  ADMIN = 2,
}
export type USER_GENDER = "m" | "f";
export type STATUS_FILTER = USER_STATUS | undefined;

export interface Identifiable<IdType> {
  id: IdType;
}

export type IdType = number | undefined;

export type UserListener = (user: UserT) => void;
export const Guest: Partial<UserT> = {
  username: "Guest",
  firstName: "",
  lastName: "",
  password: "",
  gender: "f",
  status: USER_STATUS.ACTIVE,
  avatar: "",
  registered: 0,
  modified: 0,
    id:0,
  role: 1,
};
export type FilterT = {
  [key: string]: USER_ROLE | USER_STATUS | undefined;
  role: USER_ROLE | undefined;
  status: USER_STATUS | undefined;
};
