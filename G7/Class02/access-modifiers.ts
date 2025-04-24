/**
 * Access modifiers:
 * - public
 * - private
 * - protected
 * - readonly
 */

class BankAccount {
    // Public property - Accessible from anywhere
    public accountNumber: string;
    // Public property - If we do not provide access modified the default one is public
    bankName:string;

    // Private property - only accessible within the class
    private balance: number 


    // Protected property
    protected owner: string;

    // Readonly property (we can give a default value also)
    readonly bankCode: string = "BC_1234"

    // Static property - belongs to the class and not the object that is instance of the class
    // Static properties cannot be accessed within the class
    static bankOwner: string = 'Bob Bobski'


    constructor(accountNumber: string, bankName: string, initialBalance: number, owner: string){
        this.accountNumber = accountNumber
        this.bankName = bankName
        this.balance = initialBalance
        this.owner = owner
    }

    // Costum public method that returns a private property
    public getBalance():number {
        return this.balance // can be accessed within the class
    }

    // Getter
    get accountBalance(): number {
        return this.balance
    }

    // Costum public method that changes the private property
    public setBalance(newBalance: number): void {
        if(newBalance < 0){
            throw new Error('Balance cannot be negative number.')
        }
        this.balance = newBalance;
    }

    // Setter
    set accountBalance(newBalance: number){
        if(newBalance < 0){
            throw new Error('Balance cannot be negative number.')
        }
        this.balance = newBalance;
    }

    // Private method 
    private generateStatement():string {
        return `Account: ${this.accountNumber}\nOwner: ${this.owner}\nBalance: ${this.balance}`
    };
 
    // If we do not specify an access modifier, by default it is public
    printStatement() {
        console.log(this.generateStatement())
    }
 
    // Protected methods can be only accessible within the class and subclasses
    protected getOwner(){
        return this.owner
    }

    public withdraw(ammount: number): void {
        if(ammount < 0){
            throw new Error('We cannot withdraw negative ammount')
        }

        if(ammount > this.balance){
            throw new Error('You cannot withdraw more then you have')
        }

        this.balance -= ammount;

        console.info(this.generateStatement())
    };


};

const account = new BankAccount("ACC123456", "Halk", 1000, "John Doe");

// Access public members
console.log(account.accountNumber);
console.log(account.bankName);
// console.log(account.balance); // Error: Property 'balance' is private
console.log(account.getBalance()); // Using public method to consume private property
console.log(account.accountBalance); // Using getter to consume private property

// account.balance = 1230 // Error: Property 'balance' is private

account.setBalance(1500);
console.log(account.accountBalance);

account.accountBalance = 2000 // The setter has the same name as the getter, but when we assign new value using equals sign " = " the setter is triggered;
console.log(account.accountBalance);

// NOTE: If you want to expose the propected prop we can do getter or public method that returns it
// as same as we did for the private properties
// console.log(account.owner) // Error: Property 'owner' is propected

console.log(account.bankCode)
// account.bankCode = "New CODE" // Error: Property 'bankCode' is readonly, we can not assign new value

// console.log(account.bankOwner) // Error: Property 'bankOwner' is static, we can only access it through the class

console.log(BankAccount.bankOwner)

// account.generateStatement() // Error: Method generateStatement is private

account.printStatement()


console.log('******** INHERTIENCE ********');

class SavingsAccount extends BankAccount {
    private interestRate: number;

    constructor(accountNumber: string, bankName: string, initialBalance: number, owner: string, interestsRate: number){
        super(accountNumber, bankName, initialBalance, owner) // is a method that invokes the constructor of the class that we EXTEND from

        this.interestRate = interestsRate;

        // this.balance = 5000;
        this.owner = "NEW OWNER" // this works: 'owner' protected
    }
};

console.log('***** PARAMETAR PROPERTIES SHORTHAND *****');

class CompactBankAccount {
    // Parameter properties shorthand
    constructor(
        public accountNumber: string, // this.accountNumber = accountNumber
        private balance: number,
        protected owner: string,
        readonly bankName: string = 'Compact Bank'
    ){}
};

const compactAccount = new CompactBankAccount('123123', 3000, 'John Doe')
console.log(compactAccount)