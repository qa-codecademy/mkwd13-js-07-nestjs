# NestJS JWT Authentication Homework: Securing Library Management System

## Overview

Extend your Library Management System from Class 08 by implementing JWT authentication. You'll secure your API endpoints using the knowledge gained from our JWT lesson.

## Requirements

### Authentication Setup

1. Add JWT authentication to your existing project
2. Create User and Auth modules with necessary components
3. Implement JWT strategy for securing endpoints

### User Entity

- `id`: Primary key (auto-generated)
- `username`: String (required, unique)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `createdAt`: Date (auto-generated)

### Authentication Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive JWT access token

### Protected Endpoints

Secure your existing endpoints with JWT authentication:

#### Categories Endpoints

- `GET /categories`: Public access
- `GET /categories/:id`: Public access
- `POST /categories`: Protected (requires authentication)
- `PUT /categories/:id`: Protected (requires authentication)
- `DELETE /categories/:id`: Protected (requires authentication)

#### Books Endpoints

- `GET /books`: Public access
- `GET /books/:id`: Public access
- `POST /books`: Protected (requires authentication)
- `PUT /books/:id`: Protected (requires authentication)
- `DELETE /books/:id`: Protected (requires authentication)

### Implementation Tasks

1. Create User entity and DTO objects
2. Implement password hashing using bcrypt
3. Create Auth module with JWT implementation (access token only)
4. Create JWT authentication guard
5. Apply guards to appropriate controller routes
6. Update existing endpoints to check for authentication

### Additional Requirements

- Ensure proper validation of authentication data
- Add appropriate error handling for authentication failures
- Use environment variables for JWT secret and expiration time

## Submission

Submit your code as a GitHub repository with:

- Complete working code with JWT authentication
- Examples of API calls including authentication (Postman collection recommended)

## Notes

- Use the code from Class 11 as a reference for JWT implementation
- Focus on proper security practices (password hashing, JWT validation)
- Implement only access token (no refresh token required)
- Make sure to protect appropriate routes with JWT authentication
- Token validation should be applied to protected routes