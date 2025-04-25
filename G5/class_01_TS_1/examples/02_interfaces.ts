interface Vehicle {
	brand: string;
	model: string;
	year: number;

	start(): void;
	stop(): void;
	getInfo(): string;
}

class Car implements Vehicle {
	constructor(
		public brand: string,
		public model: string,
		public year: number
	) {}

	start(): void {
		console.log(`Starting ${this.brand} ${this.model}`);
	}

	stop(): void {
		console.log(`Stopping ${this.brand} ${this.model}`);
	}

	getInfo(): string {
		return `${this.year} ${this.brand} ${this.model}`;
	}
}

export const opelAstra = new Car('Opel', 'Astra', 2012);

interface WheeledVehicle extends Vehicle {
	wheels: number;
}

const bmwCar: WheeledVehicle = {
	brand: 'BMW',
	model: '118',
	year: 2020,
	wheels: 4,
	getInfo: () => '',
	start: () => void 0,
	stop: () => void 0,
};

const yugo = {
	brand: 'Zastava',
	model: 'Yugo 65',
	year: 1956,
	wheels: 4,
	getInfo: () => '',
	start: () => void 0,
	stop: () => void 0,
} satisfies WheeledVehicle;

interface Users {
	[id: number]: string;
}

const users = {
	1: 'John',
	2: 'Jane',
	3: 'Petar',
	4: 'Nikola',
	5: 'Kiril',
} satisfies Users;

const arrayUsers = [
	{ id: 1, name: 'John' },
	{ id: 2, name: 'Jane' },
	{ id: 3, name: 'Petar' },
	{ id: 4, name: 'Nikola' },
	{ id: 5, name: 'Kiril' },
];

// users['5']

// { [id: number]: string }
export const mappedUsers = arrayUsers.reduce<Users>(
	(sum, acc) => ({
		...sum,
		[acc.name]: acc.id,
	}),
	{}
);
