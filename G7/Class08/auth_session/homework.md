# NestJS TypeORM Homework: Library Management System

## Overview

Create a simple library management system using NestJS and TypeORM. The system will maintain books and their categories.

## Requirements

### Setup

1. Create a new NestJS project
2. Set up TypeORM with PostgreSQL
3. Create the necessary modules, controllers, services, and entities

### Entities

#### Category

- `id`: Primary key (auto-generated)
- `name`: String (required, unique)
- `description`: String (optional)
- `books`: One-to-many relation with Book entity

#### Book

- `id`: Primary key (auto-generated)
- `title`: String (required)
- `author`: String (required)
- `publicationYear`: Number (required)
- `isbn`: String (required, unique)
- `description`: String (optional)
- `available`: Boolean (default: true)
- `category`: Many-to-one relation with Category entity

### API Endpoints

#### Categories

- `GET /categories`: Get all categories
- `GET /categories/:id`: Get a specific category by ID, including its books
- `POST /categories`: Create a new category
- `PUT /categories/:id`: Update a category
- `DELETE /categories/:id`: Delete a category

#### Books

- `GET /books`: Get all books (with optional filtering by category, author, or availability)
- `GET /books/:id`: Get a specific book by ID
- `POST /books`: Create a new book (with category association)
- `PUT /books/:id`: Update a book
- `DELETE /books/:id`: Delete a book

### Additional Features (Optional)

- Add validation for all inputs
- Create custom DTOs for data transfer
- Add basic error handling
- Implement sorting options for book listings (by title, author, etc.)

## Submission

Submit your code as a GitHub repository with:

- Complete working code
- A README file explaining how to run the application
- Examples of API calls (can be Postman collection)

## Notes

- Focus on properly setting up the TypeORM relations
- No authentication is required for this homework
