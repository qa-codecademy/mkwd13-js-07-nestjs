/**
 * Abstranct
 *
 */


abstract class Shape {
    // Abstract properties must be implemented by the subclass
    abstract color: string;

    // Abstract methods must be implemented by the subclass
    abstract calculateArea():number;
    abstract draw():void;

    // Regular props
    protected x: number;
    protected y: number;

    constructor(x: number, y:number){
        this.x = x;
        this.y = y
    }


    describe(): string {
        return `A ${this.color} shape is at position x:${this.x} y:${this.y}`
    }
}

// const shape = new Shape(1, 5) // Error: Cannot craete instance out of abstract class

class Circle extends Shape {

    constructor(
        x: number,
        y: number,
        public color: string,
        public radius: number,
    ){
        super(x, y)
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius
    };

    draw(): void {
        console.log(`Drawing a ${this.color} circle at ${this.x} and ${this.y}`)
    }
};

const myCirle = new Circle(4, 10, 'red', 10);
console.log(myCirle)

class Recrangle extends Shape {

    constructor(
        x: number,
        y: number,
        public color: string,
        public width: number,
        public height: number
    ){
        super(x, y)
    }

    calculateArea(): number {
        return this.width * this.height
    };

    draw(): void {
        console.log(`Drawing a ${this.color} rectangle at ${this.x} and ${this.y}`)
    }
};

const myRectangle = new Recrangle(1, 4, 'blue', 10, 50);
console.log(myRectangle);


console.log('**** INTERFACE AND CLASSES ****');

interface IAtm {
    balance: number;
    deposit: (ammount: number) => void; 
}

const atm: IAtm = {
    balance: 4000,
    
    deposit(ammount: number) {
        console.log('ammount to deposit is', ammount)
        this.balance += ammount
    }
};

// A class can implement one or multiple Interfaces
class ATM implements IAtm {
    constructor(
        public balance: number
    ){}

    deposit (ammount: number)  {
        this.balance += ammount
    };
};