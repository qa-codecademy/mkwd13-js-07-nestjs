# Homework - NestJS CLI and Controllers

## Basic Requirements

1. Create a new NestJS project using the CLI
2. Create a controller for managing a "Book Store" with the following endpoints:
   - GET /books - Get all books
   - GET /books/:id - Get a specific book by ID
   - POST /books - Create a new book
   - PUT /books/:id - Update a book
   - DELETE /books/:id - Delete a book
3. Use mock data stored in the controller
4. Use route parameters and query parameters where appropriate

## Advanced Requirements

1. Add query parameters to filter books:
   - GET /books?minPrice=10 - Filter books by minimum price
   - GET /books?author=John - Filter books by author
2. Use at least one @HttpCode decorator to set custom status codes

## Submission Guidelines

Code needs to be placed in a repo and sent to trainer and assistant for review within 7 days of class taking place.
Attach Postman collection to check endpoints.
