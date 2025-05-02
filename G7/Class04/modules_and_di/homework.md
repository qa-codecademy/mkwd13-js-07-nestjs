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
   - Keep mock data in services (the data should be in service)


## Advanced Requirements (Bonus)

1. Add validation for the data:
   - Email should be unique
   - Posts should have a minimum length for title and content
   - AuthorId should reference an existing user (before creating post, you must check if that user exist)

2. Implement a feature to get all posts by a specific user

## Submission Guidelines

Code needs to be placed in the already existing repo students have and sent to trainer and assistant for review within 7 days of class taking place.
