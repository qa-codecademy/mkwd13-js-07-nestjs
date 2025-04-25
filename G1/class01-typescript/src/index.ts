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
