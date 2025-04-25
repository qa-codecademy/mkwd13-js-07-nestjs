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
