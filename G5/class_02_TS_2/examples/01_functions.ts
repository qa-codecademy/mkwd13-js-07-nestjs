// Basic function
function add(x: number, y: number): number {
	return x + y;
}

const add2 = (x: number, y: number): number => x + y;

// Optional parameters

export function greet(name: string, greeting?: string): string {
	if (greeting) {
		return `${greeting}, ${name}`;
	}
	return `Hello, ${name}`;
}

greet('Ivo');
greet('Ivo', 'Hi');

// Default parameter
export function greet2(name: string, greeting: string = 'Hello'): string {
	return `${greeting}, ${name}`;
}

greet2('Ivo');
greet2('Ivo', 'Hi');

// Rest parameters
function sum(...numbers: number[]): number {
	return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3);
sum(1);
sum(1, 2, 4, 123, 11);

// Generic functions

interface User {
	id: number;
	name: string;
}

interface BankAccount {
	serialNumber: number;
	isActive: boolean;
	mainBankId: number;
}

const users: User[] = [
	{
		id: 1,
		name: 'John',
	},
	{
		id: 2,
		name: 'Jane',
	},
];

const bankAccounts: BankAccount[] = [
	{
		serialNumber: 123,
		isActive: true,
		mainBankId: 1,
	},
	{
		serialNumber: 1234,
		isActive: false,
		mainBankId: 2,
	},
];

function firstElement<T>(array: T[]): T | undefined {
	return array[0];
}

function findElement<T>(array: T[], index: number): T | undefined {
	return array[index];
}

const firstUser = firstElement(users);
const firstBankAccount = firstElement(bankAccounts);

const secondUser = findElement(users, 1);
const secondBankAccount = findElement(bankAccounts, 1);

interface Lengthwise {
	length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
	return arg.length;
}

logLength([1, 2, 3]);
logLength('djhdasjkhdsa');
// logLength(1)

// Async functions

function fetchData(): Promise<string> {
	return new Promise(resolve => {
		setTimeout(() => resolve('Data fetched'), 1000);
	});
}
