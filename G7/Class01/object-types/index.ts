const animal = {
    name: 'Bubi',
    type: 'dog',
    age: 7
}
console.log(animal)

// Type
type Animal = {
    name: string,
    type: string,
    age: number;
};

const animalTwo: Animal = {
    name: 'Milka',
    type: 'cow',
    age: 3
};

let animalThree: Animal = {
    name: 'Animal Name',
    type: 'Animal type',
    age: 10
};

// Will show an error since we are missing a property that is defined in the type Animal
// let animalFour: Animal = {
//     name: 'Animal Name',
//     type: 'Animal type'
// };

// The type Dog is going to have everything that type Animal has, including breed that is only meant for the type Dog
type Dog = Animal & {
    breed: string;
};

const firstDog: Dog = {
    name: 'Lexy', 
    age: 4,
    type: 'Dog',
    breed: 'Golden Retriever'
}


// Interface 
interface Person {
    id: string,
    fullName: string,
    age: number,
    gender?: string // Optional property (also applies for TYPES)
}

// the value for personOne MUST represent/respect the interface Person
const personOne: Person = {
    id: '1',
    fullName: 'Bob Bobski',
    age: 35
};

const personTwo: Person = {
    id: '2',
    fullName: 'John Doe',
    age: 27,
    gender: 'Male'
};

interface Student {
    id: string,
    fullName: string,
    academy: string
}

// Interface vs Type

type User = Student | Person;
// interface UserTwo = Student | Person; // We cannot achieve this with interfaces

// interface Programmer = Person & {} // We cannot achieve this

// Specific usecase for interfaces (extends). We cannot achieve this with types
interface Programmer extends Person {
    // Programmer EXTENDS/INHERITS EVERY property that the interface Person has

    programmingLanguages: string[]
}

const programmerOne: Programmer = {
    id: '3',
    age: 25,
    fullName: 'Bob Bobski',
    programmingLanguages: ['JS', 'TS', 'Node', 'Python']
}