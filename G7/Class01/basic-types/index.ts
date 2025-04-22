// Number
let age: number = 30;
let price: number = 199.99;

// let height: number = '123'; // We gonna see error, we cannot assign a string value to a variable that expects a number;


let weight: number;
// weight = parseInt('qwe') // NaN => typeof NaN === number
weight = Number('90');

let streetNumber: number = 0;

// We gonna get error since we do not provide the correct type
// that the variable is expecting
// streetNumber = '';
// streetNumber = false;
// streetNumber = [];

streetNumber = 44; // this works =)

// String
const firstName: string = 'John';
const greeting: string = `Hello, ${firstName}`;

console.log(greeting);

// Boolean
const isStudent: boolean = true;
const isAdult: boolean = age > 18;
const isWorking: boolean = false;


// Arrays
// The values in the array MUST be of type STRING
let students: Array<string> = ['John', 'Bob', 'George'];
let fruits: string[] = ['Banana', 'Pineapple', 'Tomatoe'];
const ids: (string | number)[] = ['1', 2, 3, '4'];


// Type 'number' is not assignable to type 'string'.
// let addresses: string[] = ['Address st_1', 123];

// Any
let notSure: any = 4;
notSure = 'Some string'
notSure = [1, 2, 3];

// Undefined / Null

// | => PIPE
let fullName: undefined | string = undefined;
let nullValue: null = null;

// Mixed types (that a value can be either one of the types)
// TYPE UNION
let year: number | string = '2025';
year = 2024;
year = 2020;;

fullName = 'John Doe';
