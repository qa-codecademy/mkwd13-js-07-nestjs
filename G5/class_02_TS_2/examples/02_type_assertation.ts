// Basic Type assertion

let someValue: any = 'this is a string';

let asString = someValue as string;

let stringLength: number = asString.length;

// as unknown as string

let otherValue: any = 'something';

// Doesn't work with JSX - React
let otherLength: number = (<string>otherValue).length;

interface User {
	id: number;
	name: string;
	email: string;
}

const userAsJson = `{"id":1, "name":"John", "email","john@example.com"}`;

const user: User = JSON.parse(userAsJson) as User;

function handleInput(event: Event) {
	const input = event.target as HTMLInputElement;
	console.log(input.value);
}
