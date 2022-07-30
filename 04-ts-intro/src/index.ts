import { Admin, Author, UserBase, Reader, Role, User} from "./model/user.js";
import { UserRepository, UserRepositoryImpl } from "./dao/user-repository.js";
import { NumberIdGenerator } from "./model/id-generator.js";
function greeter(user: UserBase) {
   const returnAr = users.map(user => {return user.toString()}).join(", ")
    return returnAr
}
const users: User[] = [
  new Reader ("hosho","losho","nema","asd@asd.sad","asdasd"[2]),
  new Author ("hosho","losho","nema","asd@asd.sad","asdasd"[0]),
  new Admin ("hosho","losho","nema","asd@asd.sad","asdasd"[1])
]
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
const userRepo: UserRepository  = new UserRepositoryImpl(new NumberIdGenerator())
users.forEach(user => userRepo.create(user));




// document.getElementById("results")!.innerHTML = greeter(users);
