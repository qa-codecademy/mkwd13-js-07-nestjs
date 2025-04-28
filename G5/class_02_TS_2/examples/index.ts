// import { greet } from './01_functions';
import { User } from './03_decorators';
import {
	CreditCardPayment,
	BankAccount,
	PremiumAccount,
	SavingsAccount,
} from './04_classes';

// greet('Ivo');

// const ivo = new User('I');
// ivo.greet('Hi');

const account1 = new BankAccount('John Doe', 1000);
const savings = new SavingsAccount('Jane Doe', 0.05, 2000);
const premium = new PremiumAccount('Jane Doe', 5000);

console.log(account1.balance);
account1.deposit(100);
console.log(account1.balance);

// account1._balance; Can't reach private properties outside of the class

account1._accountNumber;

savings.