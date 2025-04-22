// Functions in TypeScript

// Basic function
function add(x: number, y: number): number {
    const result = x + y;

    return result
};

console.log(add(5, 10));

// With arrow function
const multiply = (x: number, y: number): number => {
    return x * y
};

// Void function (functions that that NOT return a value)
function printID(id: string | number): void {
    console.log(`Id: ${id}`);
};


interface Car {
    id: string,
    color: string,
    fuel: string
};

const createCar = (carColor: string, carFuel: string): Car => {
    return {
        id: '1',
        color: carColor,
        fuel: carFuel
    }
};


function greet(name: string, greeting?: string): string {
    if(greeting){
        return `${greeting} ${name}!`
    }
    return `Hello ${name}`
}

console.log(greet('Bob'));

console.log(greet('Jane', 'Hola'));

// ENUMS
enum DIFFICULTY {
    // KEY = VALUES (PAIRS)
    EASY = "Easy to make",
    MEDIUM = "A bit harder to make",
    HARD = "Chef culinary skills required"
}

interface Recipe {
    id: number,
    name: string,
    ingrediants: string[],
    // EASY, MEDIUM, HARD
    difficulty: DIFFICULTY
};

const createRecipe = (name: string, ingrediants: string[], difficulty: DIFFICULTY): Recipe => {
    const recipe: Recipe = {
        id: Date.now(),
        name,
        ingrediants,
        difficulty
    }

    return recipe
};

// createRecipe('Banana Smoothie', ['Banana', 'Milk'], "Easy to make") // won't work since we have type error for "Easy to make"
const recipeOne = createRecipe('Banana Smoothie', ['Banana', 'Milk'], DIFFICULTY.EASY);

console.log(recipeOne)

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
};

enum GameMovements {
    W = "Move Forward",
    A = "Move Left",
    S = "Move Backward",
    D = "Move Right"
}

