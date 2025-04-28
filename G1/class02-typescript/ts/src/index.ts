//Type assertion

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    city: string;
    street: string;
  };
}

const studentJohn: Student = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  address: {
    city: "Orlando",
    street: "Street",
  },
};

const studentJSON = JSON.stringify(studentJohn);

const parsedStudent = JSON.parse(studentJSON) as Student;
const parsedStudent2 = <Student>JSON.parse(studentJSON);

interface Todo {
  userId: number;
  id: number;
  title: string;
  author: string;
  completed: boolean;
}

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(json => {
    const todo = json as Todo;

    // console.log(todo);
    // console.log(todo.completed);
  });

//Generics

const getProducts = async () => {
  return ["shoes", "machines", "books"];
};

const getStock = async (): Promise<number> => {
  return 1;
};

interface Product<T> {
  title: string;
  stock: number;
  metaData: T;
}

interface DishwasherMetaData {
  serialNumber: string;
  capacity: number;
}

interface BlenderMetaData {
  rpm: 1000 | 12000 | 20000;
  gears: 1 | 3 | 5;
}

const washingMachine: Product<DishwasherMetaData> = {
  title: "Whirpool Dishwasher",
  stock: 1200,
  metaData: {
    serialNumber: "D123123",
    capacity: 123123,
  },
};

const blender: Product<BlenderMetaData> = {
  title: "Tefal Blender",
  stock: 120,
  metaData: {
    rpm: 12000,
    gears: 3,
  },
};

//Partials

interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const userOne: User = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@gmail.com",
  age: 32,
};

const updateData: Partial<User> = {
  email: "updated@gmail.com",
};

const dataObj: { [key: string]: string | number } = {};

//keyof

const readUserProperty = (user: User, property: keyof User) => {
  return user[property];
};

console.log(readUserProperty(userOne, "firstName"));
console.log(readUserProperty(userOne, "lastName"));
console.log(readUserProperty(userOne, "age"));
