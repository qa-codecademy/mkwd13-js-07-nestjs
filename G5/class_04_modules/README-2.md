# NestJS Validation & Documentation Example

This project demonstrates the usage of validation and documentation features in NestJS using a football players API as an example.

## Main Features

- Input validation using class-validator
- Custom validation decorators
- Swagger documentation with detailed response types
- Response transformation
- TypeScript DTOs with validation rules
- Comprehensive error handling

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`

## API Documentation

Swagger documentation is available at `http://localhost:3000/api`

## Key Concepts

### Validation

1. **DTO Validation**

   - Uses class-validator decorators for input validation
   - Validates data types, ranges, and formats
   - Example: `@IsString()`, `@Min()`, `@Max()`
   - Custom validation for complex rules

2. **Custom Validation**

   - Custom decorator that validates blood type
   - Demonstrates how to create reusable validation rules
   - Complex validation logic with error messages

3. **Global Validation Pipe**
   - Automatically transforms and validates all incoming requests
   - Whitelist mode enabled to strip unknown properties
   - Transform mode enabled for automatic type conversion
   - Detailed error messages for validation failures

### Documentation

1. **Swagger Integration**

   - Detailed API documentation
   - Interactive API testing interface
   - Schema documentation for DTOs
   - Response type documentation
   - Error response documentation

2. **Decorators**
   - `@ApiTags()` for grouping endpoints
   - `@ApiOperation()` for endpoint descriptions
   - `@ApiCreatedResponse()` for 201 responses
   - `@ApiOkResponse()` for 200 responses
   - `@ApiNotFoundResponse()` for 404 responses
   - `@ApiBadRequestResponse()` for 400 responses
   - `@ApiParam()` and `@ApiQuery()` for parameter documentation

### Response Transformation

1. **Global Interceptor**

   - Transforms all responses to include:
     - payload: The actual data
     - count: Number of items (for arrays)
     - timestamp: Current server time

2. **Error Handling**
   - Consistent error response format
   - Detailed error messages
   - HTTP status code mapping
   - Validation error details

## Useful Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [class-validator Documentation](https://github.com/typestack/class-validator)
- [class-transformer Documentation](https://github.com/typestack/class-transformer)
- [Swagger Documentation](https://swagger.io/docs/)
