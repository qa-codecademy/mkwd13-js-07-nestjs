import { STATUS_CODES } from "http";

console.log("this is from the typescript file");

let firstName = "Igor";

firstName = "Borche";

//Primitive data types in typescript

const lastName: string = "Veic";

let age: number = 31;

age = 100;

console.log(age);

const isStudentReady: boolean = true;

const empty = null;

//Always add types to variables that are not initialized
// let academyName: string;
let academyName: string;

academyName = "Academy for Programming";

let dontUseMe: any = "I will break your code";

dontUseMe = {
  msg: "Like this",
};

dontUseMe = true;

dontUseMe = ["1", "2"];

dontUseMe = undefined;

//Objects

const user: { firstName: string; title: string; age: number } = {
  firstName: "John",
  title: "Developer",
  age: 99,
};

type User = {
  firstName: string;
  title: string;
  age: number;
  //Putting question mark before the type of a property makes it optional
  city?: string;
};

const userTwo: User = {
  firstName: "Jane",
  title: "Designer",
  age: 32,
  city: "San Francisco",
};

const userThree: User = {
  firstName: "Bob",
  title: "Truck Driver",
  age: 32,
};

//Arrays

const fruitNames: string[] = ["apples", "oranges", "lemons"];

const grades: number[] = [1, 2, 3, 4, 5, 7];

const combined: number[] = [...grades, 7, 8, 9];

combined.push(100);

const users: User[] = [userTwo, userThree];

users.push({
  firstName: "Rob",
  title: "QA",
  age: 25,
});

console.log(users);

//Union types

let academyTitle: string | number = "SEDC";

//!AVOID THIS (UNION TYPES IN ARRAYS)
const mixedArray: (string | number)[] = [1, 2, 3, 4, "Borche"];

//Be careful and dont overuse union types, specifically primitave types

type AcademyTitle = "programming" | "design" | "networks";

const acaTitle: AcademyTitle = "design";

enum Classic {
  TYPE_ONE,
  TYPE_TWO,
  TYPE_THREE,
}

console.log(Classic.TYPE_ONE);

enum Status {
  ACTIVE = "active",
  ON_HOLD = "on-hold",
  CANCELLED = "cancelled",
}

console.log(Status.ON_HOLD);

type Device = {
  title: string;
  status: Status;
};

//Functions

const addTwoNumbers = (numOne: number, numTwo: number): number => {
  return numOne + numTwo;
};

function multiplyTwoNumbers(numOne: number, numTwo: number): string {
  return `The result of multiplying the number is ${numOne * numTwo}`;
}

console.log(multiplyTwoNumbers(10, 25));

//Functions that dont have a return keyword have a void return type
const printFullName = (firstName: string, lastName: string): void => {
  console.log(`${firstName} ${lastName}`);
};

printFullName("Elvis", "Presley");

// ?: is used to make arguments in functions optional
const sayHello = (name?: string) => {
  console.log(`${name || "User"} says hello`);
};

sayHello("John");
sayHello();

const printAcademy = (academy: AcademyTitle, length = 12) => {
  console.log(`The academy ${academy} lasts for ${length} months.`);
};

printAcademy("design", 6);

//Interfaces

interface Product {
  title: string;
  stock: number;
  description: string;
  category: string;
  price: number;
  rating?: number;
  //If void return type is used , you can return anything but its best avoided
  printInfo: () => void;
}

const shoes: Product = {
  title: "Dress Shoes",
  stock: 120,
  description: "Very fancy shoes",
  category: "Footwear",
  price: 199.99,
  rating: 8.4,

  printInfo() {
    console.log(`${this.title} : ${this.description}`);
  },
};

shoes.printInfo();

interface Person {
  firstName: string;
  lastName: string;

  getFullName(): string;
}

//Interfaces can be extended by can't be combined with &
interface Professional extends Person {
  jobTitle: string;
  salary: number;
}

const mechanic: Professional = {
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Car Mechanic",
  salary: 999999999,

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(mechanic);

console.log(mechanic.getFullName());

type Programmer = Person &
  Professional & {
    programmingLanguage: string;
  };

const igor: Programmer = {
  firstName: "Igor",
  lastName: "Veic",
  jobTitle: "Software Engineer",
  salary: 3000000,
  programmingLanguage: "Javascript",

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(igor);

//Classes

//Implements example with javascript vanilla constructor syntax
class WashingMachine implements Product {
  title: string;
  stock: number;
  category: string;
  description: string;
  price: number;
  rating: number;
  serialNumber = "A121412312312";

  constructor(
    title: string,
    stock: number,
    category: string,
    description: string,
    price: number,
    rating: number
  ) {
    this.title = title;
    this.stock = stock;
    this.category = category;
    this.description = description;
    this.price = price;
    this.rating = rating;
  }

  printInfo() {}

  getSerialNumber() {
    return this.serialNumber;
  }
}

//Modern typescript syntax for working with constructors
class Laptop implements Product {
  productionYear = 2023;
  private serialNum = "L21312412312";

  constructor(
    public title: string,
    public stock: number,
    public description: string,
    public category: string,
    public price: number,
    public rating: number,
    public countryOfOrigin: string
  ) {}

  printInfo() {
    console.log(
      `The laptop was made in ${this.countryOfOrigin}, has a rating of ${this.rating} and has a stock of: ${this.stock}`
    );
  }

  getSerialNum(): string {
    return this.serialNum;
  }
}

const hpLaptop = new Laptop(
  "Legion",
  12300,
  "Gaming Laptop, why would you buy",
  "Portale Computers",
  1200,
  7.8,
  "China"
);

console.log(hpLaptop);
//Wont work because it is private
// console.log(hpLaptop.serialNum);
