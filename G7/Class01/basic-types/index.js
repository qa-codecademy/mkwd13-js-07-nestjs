"use strict";
// Number
let age = 30;
let price = 199.99;
// let height: number = '123'; // We gonna see error, we cannot assign a string value to a variable that expects a number;
let weight;
// weight = parseInt('qwe') // NaN => typeof NaN === number
weight = Number('90');
let streetNumber = 0;
// We gonna get error since we do not provide the correct type
// that the variable is expecting
// streetNumber = '';
// streetNumber = false;
// streetNumber = [];
streetNumber = 44; // this works =)
// String
const firstName = 'John';
const greeting = `Hello, ${firstName}`;
console.log(greeting);
// Boolean
const isStudent = true;
const isAdult = age > 18;
const isWorking = false;
// Arrays
// The values in the array MUST be of type STRING
let students = ['John', 'Bob', 'George'];
let fruits = ['Banana', 'Pineapple', 'Tomatoe'];
const ids = ['1', 2, 3, '4'];
// Type 'number' is not assignable to type 'string'.
// let addresses: string[] = ['Address st_1', 123];
// Any
let notSure = 4;
notSure = 'Some string';
notSure = [1, 2, 3];
// Undefined / Null
// | => PIPE
let fullName = undefined;
let nullValue = null;
// Mixed types (that a value can be either one of the types)
let year = '2025';
year = 2024;
year = 2020;
;
fullName = 'John Doe';
