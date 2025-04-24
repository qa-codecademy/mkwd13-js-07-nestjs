// type-guard with primitive values
function formatValue(value: string | number): string {
    if(typeof value === "string"){
        return value.toUpperCase()
    }else {
        // TS knows the value is a number
       return value.toString()
    }
};

// type-guards with instanceof

class Dog {
    constructor(
        public name: string,
        public breed: string
    ){}

    makeSound(){
        return `Woof!`
    }

    fetch(){
        return `${this.name} loves to play fetch.`
    }
};

class Cat {
    constructor(public name: string, public color: string){}

    makeSound(){
        return `Meow!`
    }

    climb(){
        return `${this.name} is climbing the tree!`
    }
}

const dog = new Dog("Lexy", "Golden Retriever");
const cat = new Cat("Batman", "Black");


const handleAnimal = (animal: Dog | Cat ) => {
    if(animal instanceof Dog){
        console.log(animal.fetch())
    }
    else {
        // TS knows animal is Cat
        console.log(animal.climb())
    }
};

// type-guards using 'in' operator;

interface Car {
    model: string;
    startEngine: () => string;
}


interface Bicycle {
    model: string;
    pedal: () => string;
}


const describleVehicle = (vehicle: Car | Bicycle) => {
    if("startEngine" in vehicle){
        // TS knows that the vehicle object is going to be of type Car
        vehicle.startEngine()
    }else {
        // TS knows that the vehicle object is going to be of type Bicycle
        vehicle.pedal()
    }
};

// User-defined type guards

interface Circle {
    kind: 'circle'
    radius: number;
}


interface Rectangle {
    kind: 'rectangle'
    width: number,
    height: number
}


interface Triangle {
    kind: 'triangle'
    base: number;
    height: number
}

type Shapes = Circle | Rectangle | Triangle;

// type guard functions
function isCirle(shape: Shapes): shape is Circle {
    return shape.kind === "circle";
}

function isRectangle(shape: Shapes): shape is Rectangle {
    return shape.kind === "rectangle" && "width" in shape
}

function isTriangle(shape: Shapes): shape is Triangle {
    return shape.kind === "triangle"
};

function calculateArea(shape: Shapes){
    if(isCirle(shape)){
        return Math.PI * shape.radius ** 2;
    }
    else if(isRectangle(shape)){
        return shape.width * shape.height
    }
    else if(isTriangle(shape)){
        return 0.5 * shape.base * shape.height
    }
}