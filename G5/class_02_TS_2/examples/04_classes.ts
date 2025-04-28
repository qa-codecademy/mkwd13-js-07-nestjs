class BankAccount {
	private _balance: number;
	protected _accountNumber: string;
	public owner: string;

	constructor(owner: string, initialBalance: number = 0) {
		this._balance = initialBalance;
		this.owner = owner;
		this._accountNumber = Math.random().toString(36).slice(2);
	}

	public deposit(amount: number): void {
		if (amount <= 0) {
			throw new Error('Amount must be a positive number');
		}

		this._balance += amount;
	}

	get balance(): number {
		return this._balance;
	}

	set balance(value: number) {
		if (value < 0) {
			throw new Error('Balance cannot be a negative number');
		}
		this._balance = value;
	}

	protected validateWithdraw(amount: number): boolean {
		return this._balance >= amount && amount > 0;
	}
}

class SavingsAccount extends BankAccount {
	private _interestRate: number;

	constructor(owner: string, interestRate: number, initialBalance: number = 0) {
		super(owner, initialBalance);
		this._interestRate = interestRate;
	}

	private addInterest(): void {
		const interest = this.balance * this._interestRate;
		super.deposit(interest);
	}

	public deposit(amount: number): void {
		super.deposit(amount);
		this.addInterest();
	}
}

abstract class PaymentMethod {
	abstract process(amount: number): boolean;

	protected validateAmount(amount: number): boolean {
		return amount > 0;
	}
}

class CreditCardPayment extends PaymentMethod {
	private _cardNumber: string;

	constructor(cardNumber: string) {
		super();
		this._cardNumber = cardNumber;
	}

	process(amount: number): boolean {
		if (!this.validateAmount(amount)) {
			return false;
		}
		console.log(`Processing ${amount} via Credit Card ${this._cardNumber}`);
		return true;
	}
}

interface Lockable {
	lock(): void;
	unlock(): void;
}

interface TransferableAccount {
	transfer(amount: number, target: BankAccount): void;
}

class PremiumAccount
	extends BankAccount
	implements Lockable, TransferableAccount
{
	private _locked: boolean = false;

	lock(): void {
		this._locked = true;
	}
	unlock(): void {
		this._locked = false;
	}

	transfer(amount: number, target: BankAccount): void {
		if (this._locked) {
			throw new Error('Account is locked');
		}

		if (this.validateWithdraw(amount)) {
			this.balance -= amount;
			target.deposit(amount);
		}
	}
}

export { BankAccount, SavingsAccount, PremiumAccount, CreditCardPayment };
