import { IdType, USER_GENDER, USER_ROLE, USER_STATUS } from "./sharedTypes";

export type UserT = {
  [key: string]: any;
  id: IdType|undefined;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: USER_GENDER;
  role: USER_ROLE;
  status: USER_STATUS;
  avatar: string | undefined;
  registered: number;
  modified: number;
  description?: string;
};
