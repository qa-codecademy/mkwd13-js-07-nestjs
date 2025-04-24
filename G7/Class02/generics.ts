function wrapInArray<T>(value: T){
    return [value]
};

// Using the generic function with different types
const wrappedNumber = wrapInArray<number>(10);
const wrappedString = wrapInArray<string>('Hello World');

type Product = {
    id: number,
    name: string
}

const wrappedItem = wrapInArray<Product>({id: 1, name: "Screen"});

// Generic Interface
interface KeyValuePair<K, V> {
    key: K;
    value: V;
};

// Using the generic interface
const pair1: KeyValuePair<string, number> = {key: "age", value: 25};
const pair2: KeyValuePair<string, boolean> = {key: "isActive", value: true};


const request = async<R>(url: string, print: <R>() => void) => {
    const response = await fetch(url);
    const result: R = await response.json();

    print()
    return result

}; 

interface Products {
    id: string,
    name: string
};

const getProducts = request<Product>('http://products.adress', () => {});

interface Orders {
    id: string;
    items: Product[]
}

const getOrders = request<Orders>('http://orders.com', () => {});