# NestJS Homework: Intergalactic Zoo Management API

Welcome, brave developer! Your mission, should you choose to accept it, is to build the backend API for the new "Intergalactic Zoo". This system will manage various alien creatures, their habitats, and access control for zookeepers and visitors.

This project will test your understanding of NestJS fundamentals, including modules, controllers, services, TypeORM, authentication, authorization, DTOs, validation, error handling, and API documentation with Swagger.

## 🚀 Core Requirements

### 1. Module 1: `Creatures` - The Stars of Our Zoo!

- **Topic**: Managing Intergalactic Creatures.
- **Module**: Create a `CreaturesModule`.
- **Entity**: `Creature`
  - `id` (UUID, primary key)
  - `name` (string, unique, e.g., "Gleepglorp")
  - `species` (string, e.g., "Floofnarian")
  - `originPlanet` (string, e.g., "Xylos Prime")
  - `dangerLevel` (enum: 'Harmless', 'Caution', 'Dangerous', 'Extremely Dangerous')
  - `preferredClimate` (string, e.g., "Tropical Swamp")
  - `imageUrl` (string, optional, URL to an image of the creature)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
- **CRUD Operations**: Implement full CRUD functionality:
  - `POST /creatures`: Create a new creature.
  - `GET /creatures`: Retrieve a list of all creatures.
  - `GET /creatures/:id`: Retrieve a specific creature by its ID.
  - `PATCH /creatures/:id`: Update an existing creature's details.
  - `DELETE /creatures/:id`: Remove a creature from the zoo. (soft or delete, both are fine)

### 2. Authentication: Secure the Gates!

- **Module**: Create an `AuthModule`.
- **User Entity**: `User`
  - `id` (UUID, primary key)
  - `email` (string, unique)
  - `password` (string, must be hashed using bcrypt)
  - `role` (enum: `Zookeeper`, `Visitor`) - Default to `Visitor` on registration.
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
- **Endpoints**:
  - `POST /auth/register`: Allow new users to register.
  - `POST /auth/login`: Allow registered users to log in. Upon successful login, return a JWT access token.
- **JWT Strategy**: Implement JWT authentication using `@nestjs/jwt`.
- **Route Guarding**: Protect appropriate routes. For example, only authenticated users should be able to interact with most parts of the API.

### 3. Authorization: Who Gets the Keys?

- **Roles**: Implement role-based access control for the two roles:
  - `Zookeeper`: Can perform all CRUD operations on `Creatures` (and `Habitats` if you implement the bonus).
  - `Visitor`: Can only read (`GET`) information about `Creatures` (and `Habitats`).
- **Implementation**:
  - Create a `RolesGuard`.
  - Use a custom `@Roles()` decorator to specify allowed roles for controller methods.
  - Ensure that unauthorized access attempts are met with a `403 Forbidden` response.

### 4. Database: PostgreSQL & TypeORM

- **Database**: Use PostgreSQL as your database.
- **ORM**: Integrate TypeORM for database interactions.
- **Entities**: Define your `Creature` and `User` entities using TypeORM decorators.
- **Connection**: Configure the TypeORM connection in your `AppModule` or a dedicated database module. Use environment variables for database credentials.

Use following .env file for your database credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=intergalactic_zoo
```

### 5. DTOs, Validation, and Error Handling: Keep it Clean!

- **Data Transfer Objects (DTOs)**:
  - Create DTOs for all request bodies (e.g., `CreateCreatureDto`, `UpdateCreatureDto`, `RegisterUserDto`, `LoginDto`).
  - Use DTOs for response bodies where appropriate to structure output.
- **Validation**:
  - Use `class-validator` and `class-transformer` to validate incoming request data against your DTOs.
  - Implement a global `ValidationPipe`.
- **Error Handling**:
  - Implement robust error handling.
  - Use NestJS built-in HTTP exceptions (e.g., `NotFoundException`, `BadRequestException`, `UnauthorizedException`, `ForbiddenException`).
  - Ensure consistent error response formats. Consider a global exception filter for custom error shaping if desired.

### 6. Swagger API Documentation: The Zoo Guidebook

- **Integration**: Integrate `@nestjs/swagger` into your application.
- **Documentation**:
  - Document all API endpoints, including request parameters, request bodies (DTOs), and response schemas.
  - Clearly define all DTO properties with descriptions and examples.
  - Document security requirements (JWT Bearer token) for protected endpoints.
  - Ensure your Swagger UI (`/api`) is comprehensive and user-friendly.

## 🌟 Bonus Requirements

Achieving these will grant you legendary status among intergalactic zookeepers!

### 1. Module 2: `Habitats` - Creature Comforts!

- **Module**: Create a `HabitatsModule`.
- **Entity**: `Habitat`
  - `id` (UUID, primary key)
  - `name` (string, unique, e.g., "Crystal Caves of Xylar")
  - `climateType` (string, e.g., "Arctic Tundra")
  - `terrain` (string, e.g., "Rocky, Subterranean")
  - `maxCapacity` (number, how many creatures it can ideally hold)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
- **Relationship**:
  - Establish a relationship between `Creatures` and `Habitats`. A `Habitat` can house many `Creatures`, and a `Creature` belongs to one `Habitat`.
  - Update your `Creature` entity to include a `habitatId` (foreign key) and the corresponding TypeORM relation (`@ManyToOne`).
  - Update your `Habitat` entity with the corresponding TypeORM relation (`@OneToMany`).
- **CRUD Operations for `Habitats`**:
  - `POST /habitats`: Create a new habitat (Zookeepers only).
  - `GET /habitats`: Get a list of all habitats (All authenticated users).
  - `GET /habitats/:id`: Get a specific habitat by ID, optionally including a list of creatures residing in it (All authenticated users).
  - `PATCH /habitats/:id`: Update a habitat (Zookeepers only).
  - `DELETE /habitats/:id`: Delete a habitat (Zookeepers only). Ensure appropriate handling if creatures are still assigned to it (e.g., prevent deletion or unassign creatures).
- **DTOs**: `CreateHabitatDto`, `UpdateHabitatDto`.
- **Assigning Creatures**: Consider how a creature is assigned to a habitat. This could be part of the `CreateCreatureDto`/`UpdateCreatureDto` or a separate endpoint.

### 2. Refresh Tokens: Stay Logged In Longer!

- **Enhance `AuthModule`**:
  - Upon successful login, issue both an JWT access token (short-lived) and a JWT refresh token (long-lived).
  - Securely store the refresh token (e.g., in the database)
