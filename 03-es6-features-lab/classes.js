const ADMIN = 0;
const AUTHOR = 1;
const READER = 2;

const Role = ["ADMIN", "AUTHOR", "READER"]
class Person {
  static nextId = 0;
  id = ++Person.nextId;
  constructor(fName, lName, address) {
    this.fName = fName;
    this.lName = lName;
    this.address = address;
  }
  toString() {
    return `ID: ${this.id}, Name: ${this.fName + " " + this.lName}, Lives at: ${
      this.address
    }`;
  }
}
class User extends Person {
  constructor(fName, lName, address, usernName, password, role) {
    super(fName, lName, address);
    this.usernName = usernName;
    this.password = password;
    this.role = role;
  }
  toString() {
    return `${super.toString()}, username: ${this.usernName},
     password: ${this.password}, role: ${Role[this.role]}`;
  }
}
const p1 = new Person("Gosho", "Mosho", "Na loosho")
const p3 = new Person("Vanka", "Mashinkata", "Na loosho")
const p2 = new User("Gosho", "Mirishe", "Krusho", "usname", "pw", ADMIN)
const p4 = new User("Rumen", "Igumen", "Krusho", "usname", "pw", READER)
const people = [p1,p2,p3,p4];
people.forEach(p=>console.log(p.toString()))
