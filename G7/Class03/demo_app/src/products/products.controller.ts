import { Controller, Get, Post, Body, Param, Res, Delete, Put, Query } from "@nestjs/common";
import { Response } from "express";

interface ProductReqBody {
    name: string,
    price: number,
    category: string
};

interface UpdateProductBody {
    name?: string,
    price?: number,
    category?: string
}

// localhost:3000/products
// every endpoint/route that we difine in this controller
// is going to get accessed through the endpoint /products
@Controller('products') 
export class ProductsController {
    private products = [
        {id: 1, name: 'Laptop', price: 999.99, category: 'Electronics'},
        {id: 2, name: 'Smartphone', price: 399.99, category: 'Electronics'},
        {id: 3, name: 'Headphones', price: 59.99, category: 'Audio'}
    ];

    // ACCESSED ON: route: localhost:3000/products & method: GET
    @Get() 
    findAll(){
        return this.products;
    }

    // localhost:3000/products/search => MAIN ROUTE
    // QUERY PARAMETERS (key=value) PAIR; localhost:3000/products/search?key=value 
    // localhost:3000/products/search?minPrice=2000&category=Audio
    @Get('search')
    search(
        @Query('minPrice') minPrice?: string,
        @Query('category') category?: string
    ){
        let result = [...this.products];

        if(minPrice){
            result = result.filter((product) => product.price >= parseFloat(minPrice))
        }

        if(category){
            result = result.filter((product) => product.category === category)
        }

        return result
    }

    // route: localhost:3000/products & method: POST
    /**
     * @Post() => Is a method decorator that makes the method accessible through a POST HTTP method
     * @Body() => Is a parameter decorator that extracts the BODY from the request
     */
    @Post()
    create(@Body() requestBody: ProductReqBody){
        console.log(requestBody);

        const newProduct = {
            id: this.products.length + 1,
            name: requestBody.name,
            price: requestBody.price,
            category: requestBody.category
        };

        this.products.push(newProduct);

        return newProduct;
    }

    // PATH parameter
    // localhost:3000/products/:id
    //@Param => is a property decorator that EXTRACTS the path parameter from the request
    //@Res => will give us access to the native response object
    //@Req => will give us access to the native request object
    @Get(':id')
    findOne(@Param('id') id: string, @Res() response: Response){
        const product = this.products.find((p) => p.id === parseInt(id));

        if(!product){
            // Once we use the native response object we must return values using it in the method
            return response.status(404).send({message: `Product with id: ${id} not found.`})
        };
        
        return response.send(product);
    }

    // localhost:3000/products/:id
    // @Delete => is a method decorator that exposes the method through DELETE http method
    @Delete(':id')
    remove(@Param('id') id: string){
        const filteredProducts = this.products.filter((product) => product.id !== parseInt(id));

        this.products = filteredProducts;

        return {
            message: `Product with id: ${id} removed.`
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() requestBody: UpdateProductBody, @Res() response: Response){
        const productIndex = this.products.findIndex((product) => product.id === +id);
        // findIndex returns -1 if the value is not found
        if(productIndex === -1){
            return response.status(404).send({message: "Product not found"})
        }

        const product = this.products[productIndex];

        const updatedProduct = {
            id: product.id,
            name: requestBody.name || product.name,
            price: requestBody.price || product.price,
            category: requestBody.category || product.category
        };

        this.products[productIndex] = updatedProduct;

        return response.send(updatedProduct)

    }
}