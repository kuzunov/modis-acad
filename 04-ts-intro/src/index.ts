import { Admin, Author, UserBase, Reader, User} from "./model/user.js";
import { UserRepository, UserRepositoryImpl } from "./dao/user-repository.js";
import { NumberIdGenerator } from "./model/id-generator.js";

function greeter(user: UserBase, date:Date):string;
function greeter(user: string, date?:Date):string;

function greeter(user: UserBase |string , date?:Date) {
   //const returnAr = users.map(user => {return user.toString()}).join(", ")
    //return `${date.toString()} ${user.toString()}`
    // if (typeof user === "string") {
    if (user instanceof UserBase) {
      return `${user.toString()}`;
    }
    return `${user} ${date?.toString()}`
    
  }
const users: User[] = [
  new Reader ("hosho","losho","nema","asd@asd.sad","asdasd"[2]),
  new Author ("hosho","losho","nema","asd@asd.sad","asdasd"[0]),
  new Admin ("hosho","losho","nema","asd@asd.sad","asdasd"[1])
]

const userRepo: UserRepository  = new UserRepositoryImpl(new NumberIdGenerator())
users.forEach(user => userRepo.create(user));

const elem = document.getElementById('results');
if (elem != null) {
  elem.innerHTML = greeter("mosho", new Date(`1992-12-17`))
}
const name = "gerge"
console.log(name)

interface Circle {
  kind: "circle"
  radius:number;
}
interface Square {
  kind: "sqare",
  sideLength:number;
}
type Shape = Circle | Square;

function getArea(shape: Shape){
  if (shape.kind === "circle") {
    return Math.PI * shape.radius **2;
  } else {
    return shape.sideLength**2
  }
}

type Long = {length:number}

function longest<Type extends Long>(a:Type, b:Type){
  if (a.length>=b.length){
    return a;
  }
  else {
    return b;
  }
  }


// type T = {
//   ad:string
// }
// function firstElement<T>(arr: T[]){
//   return arr[0];
// }

// firstElement([1,"asd"])

// class SomeObject {
//   constructor(public name:string){}
// }
// class SomeOtherObject {
//   constructor(public name:string){}
// }
// type SomeConstructor = {
//   new (s: string):SomeObject
// }
// type SomeOtherConstructor = {
//   new (s: string):SomeOtherObject
// }
// function fn (ctor: SomeConstructor | SomeOtherConstructor) {
//   return new ctor("hello")
// }
// console.log(Math.random()>0.5? fn(SomeOtherObject):fn(SomeObject))

// function getSmallPet () {
//   return Math.random()<0.5 ? {swim() {return}} as Fish  : {fly() {return } } as Bird
// }
// function isFish(pet: Fish|Bird):pet is Fish{
//   return (pet as Fish).swim() !== undefined;
// }
// const pet = getSmallPet();
// if (isFish(pet)){
//   pet.swim()
// } else {
//   pet.fly()
// }



// function example (x:string|number, y:string|boolean){
//   if (x===y){
//     console.log(x.toLocaleUpperCase())
//     console.log(y.toLocaleUpperCase())
//   }else {
//     console.log(x)
//     console.log(y)
//   }
// }
// example("true",true)

// type Fish = { swim: () => void};
// type Bird = {fly: () => void};
// type Human = {swim?: () => void}

// const fish:Fish = {
//   swim() {
//     console.log("this swims")
//   },
// }
// const bird:Bird = {
//   fly() {
//     console.log("this flies")
//   },
// }

// function move (animal: Fish | Bird| Human){
//   if("swim" in animal){
//     return animal.swim();
//   }
//   return animal.fly();
// }

// move(bird)
// document.getElementById("results")!.innerHTML = greeter(users);
