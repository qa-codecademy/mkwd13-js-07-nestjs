# Homework: NestJS Modules and Dependency Injection

## Basic Requirements

1. Create a new NestJS project with two feature modules:

   - Users module
   - Posts module

2. Implement CRUD operations for both modules:

   - Users: id, name, email, role
   - Posts: id, title, content, authorId (reference to user)

3. Organize the code following NestJS module patterns:

   - Separate controllers and services
   - Use dependency injection
   - Keep mock data in services

## Advanced Requirements

1. Implement circular dependency between Users and Posts:

   - Posts should have a reference to the author (User)
   - Users should have a list of their posts
   - Use forwardRef to handle the circular dependency

2. Add validation for the data:

   - Email should be unique
   - AuthorId should reference an existing user

3. Implement a feature to get all posts by a specific user

## Note

DTOs are not required, feel free to use types / interfaces

## Submission Guidelines

Code needs to be placed in the already existing repo students have and sent to trainer and assistant for review within 7 days of class taking place. Attach Postman Collection to verify
