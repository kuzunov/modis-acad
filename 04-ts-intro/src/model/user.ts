import { Person, Contact } from "./person.js";
import { IdType } from "../model/shared-types";

export interface User extends Person {
  userName: string;
  passWord: string;
  roles: Role[];
  readonly salutation: string;
  toString(): string;
}
export enum Role {
  AUTHOR,
  READER,
  ADMIN,
  MOD,
}
export class UserBase implements User {
  id: IdType|undefined
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public passWord: string,
    public email: string,
    public roles: Role[] = [Role.READER],
    public contact?: Contact
  ) {}
  get salutation() {
    return `Hello ${this.firstName} ${this.lastName} in roles: ${this.roles.map((role) => Role[role]).join(", ")}`
  }
  toString(): string {
    return this.salutation;
  }
}
export class Admin extends UserBase {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public passWord: string,
    public email: string,
    public roles: Role[] = [Role.ADMIN],
    public contact?: Contact
  ) {
    super(
      firstName,
      lastName,
      userName,
      passWord,
      email,
      [Role.READER],
      contact)
  }
  toString(): string {
    return `ADMIN: ${super.toString()}`;
  }
}
export class Reader extends UserBase {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public passWord: string,
    public email: string,
    public roles: Role[] = [Role.READER],
    public contact?: Contact
  ) {
    super(
      firstName,
      lastName,
      userName,
      passWord,
      email,
      [Role.READER],
      contact)
  }
  toString(): string {
    return `READER: ${super.toString()}`;
  }
}
export class Author extends UserBase {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public passWord: string,
    public email: string,
    public roles: Role[] = [Role.AUTHOR],
    public contact?: Contact
  ) {
    super(
      firstName,
      lastName,
      userName,
      passWord,
      email,
      [Role.READER],
      contact)
  }
  toString(): string {
    return `AUTHOR: ${super.toString()}`;
  }
}

