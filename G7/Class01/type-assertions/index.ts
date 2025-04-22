// Type inference

let movieName = "Shawshank Redemtion";
// movieName = 123 // Error: Type 'number' is not assignable to type 'string'

// Type assertion
let someValue: any = "This is a string"
let someValue2 = someValue as string; // casting type to a value. Usefull only when we are SURE of the value's type. Do not overuse it


interface Coordinates {
    lat: number
    lng: number
};


let cityCoordinates: Coordinates = {
    lat: 23123.123,
    lng: 12311
};

let cityCoordinatesSecond: Coordinates = {} as Coordinates;
console.log(cityCoordinatesSecond)

// .. somewhere below, after we retrieve the lat & lng

cityCoordinatesSecond.lat = 1111.33;
cityCoordinatesSecond.lng = 2323.44;

console.log(cityCoordinatesSecond)