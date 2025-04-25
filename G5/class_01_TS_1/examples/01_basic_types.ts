// Primitive types

// Stings
let firstName: string = 'John';
let lastName: string = 'Doe'; // "Doe"
let middleName: string = `Something`;

// Numbers
let age: number = 30; // Integer
let price: number = 99.99; // Float
let negative: number = -10;
let binary: number = 0b1010;

// Boolean
let isActive: boolean = true;
let isDisabled: boolean = false;

// JS VS TS Types
let surname: String = ''; // 'string' js type placeholders
let surnameTS: string = '';

// Special types

// any - DO NOT USE THIS!
let dateOfBirth: any = ['das', 321312];
dateOfBirth = new Date();
dateOfBirth = 'test';

// unknown
let userInput: unknown;
userInput = 5;
userInput = 'hello';

if (typeof userInput === 'string') {
	let myString: string = userInput;
}

export const test: string = 'test';

//  Functions

// void
function logSomething(): void {
	console.log('Something');

	// return '' - return is not allowed
}
// let result = logSomething();

// Never
function throwingError(error: string): never {
	throw new Error(`Unexpected error occurred: ${error}`);
}

// Null & Undefined

let dogName: string | undefined = undefined;
dogName = 'Aron';

let dogAge: number | null = null;
dogAge = 12;

// Object

// let student3: Object = {
// 	firstName: "Nesto",
// 	lastName: "Nesto",
// 	favoriteFood: ''
// }

let student1: {
	name: string;
	age: number;
	isActive: boolean;
	tagNumber: string | null;
	favoriteClass?: string; // favoriteClass: string | undefined;
} = {
	name: 'Daniel',
	age: 20,
	isActive: true,
	tagNumber: null,
};

let student2: {
	name: string;
	age: number;
	isActive: boolean;
	tagNumber: string | null;
	favoriteClass?: string;
} = {
	name: 'Igor',
	age: 22,
	isActive: false,
	tagNumber: 'ABC123',
	favoriteClass: 'SQL',
	// favoriteFood: ''
};

// Interfaces

interface Student {
	name: string;
	age: number;
	isActive: boolean;
	tagNumber: string | null;
	favoriteClass?: string;
	// writeHomework: () => string // interfaces can define methods
}

let student3: Student = {
	name: 'Daniel',
	age: 20,
	isActive: true,
	tagNumber: null,
};

let student4: Student = {
	name: 'Igor',
	age: 22,
	isActive: false,
	tagNumber: 'ABC123',
	favoriteClass: 'SQL',
	// favoriteFood: ''
};

// Enums
export enum Days {
	Monday = 1, // 1
	Tuesday, // 2
	Wednesday, // 3
	Thursday,
	Friday,
	Saturday,
	Sunday,
}
export enum DaysAsWords {
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday',
	Sunday = 'Sunday',
}

// Array
let numbers: number[] = [1, 2, 3];
let ages: Array<number> = [1, 2, 3];

// Tuple
let something: [string, number] = ['some string', 12];
// something = [123, 'dasdsa']
something = ['changed', 3412324];
let react: [unknown, () => void] = ['test', () => {}];

// Types
type Shape = 'circle' | 'square' | 'triangle';

let box1: Shape = 'circle';

type BrightColors = 'yellow' | 'white' | 'pink';
type DarkColors = 'black' | 'brown';

type AlphaNumeric = number | string;

type Colors = BrightColors | DarkColors;

let colorfulBox: Colors = 'brown';
