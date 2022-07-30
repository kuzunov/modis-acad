// import { Admin, Author, UserBase, Reader, Role} from "./user.js";
// import {User} from "../model/user.js"
// function greeter(user: UserBase) {
//    const returnAr = users.map(user => {return user.toString()}).join(", ")
//     return returnAr
// }

// const

// const user = {
//   id: 1,
//   firstName: "gosho",
//   lastName: "mosho",
//   userName: "nemalosho",
//   passWord: "gosho",
//   email: "eto.go@abv.bg",
//   contact: {
//     country: "BG",
//     address: "Sofia, 1000",
//   },
//   roles: [0, 1],
// };

// const user1 = new UserBase(
//   user.id,
//   user.firstName,
//   user.lastName,
//   user.userName,
//   user.passWord,
//   user.email,
//   user.roles
// );
// const author = new Author( user.id,
//     user.firstName,
//     user.lastName,
//     user.userName,
//     user.passWord,
//     user.email,
//     [Role.AUTHOR]
//   );
// const reader = new Reader( user.id,
//     user.firstName,
//     user.lastName,
//     user.userName,
//     user.passWord,
//     user.email,
//     [Role.READER]
//   );
// const admin = new Admin( user.id,
//     user.firstName,
//     user.lastName,
//     user.userName,
//     user.passWord,
//     user.email,
//     [Role.ADMIN]
//   );

// const users: User[] = [admin,reader,author];
// document.getElementById("results")!.innerHTML = greeter(user1);
