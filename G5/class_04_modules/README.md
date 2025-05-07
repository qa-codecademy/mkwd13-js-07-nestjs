# NestJS Modules and Dependency Injection

## Overview

This class focuses on understanding NestJS modules and dependency injection patterns. We'll explore how to organize code into feature modules and handle dependencies between them.

## Main Concepts

### Modules

- Modules are the fundamental building blocks of a NestJS application
- They help organize code into cohesive blocks of functionality
- Each module encapsulates related components, controllers, and services
- Modules can import other modules to use their functionality

### Dependency Injection

- NestJS uses dependency injection to manage dependencies between components
- Dependencies are automatically instantiated and injected where needed
- This promotes loose coupling and makes code more maintainable
- Services are automatically shared across the module where they are provided

### Feature Modules

- Feature modules organize related functionality together
- They can be imported into the main application module
- Each feature module can have its own controllers and services
- Feature modules help maintain a clean and organized codebase

## Project Structure

```
src/
├── products/              # Products feature module
│   ├── products.module.ts
│   ├── products.controller.ts
│   └── products.service.ts
├── orders/               # Orders feature module
│   ├── orders.module.ts
│   ├── orders.controller.ts
│   └── orders.service.ts
└── app.module.ts         # Main application module
```

## Common Issues and Solutions

### Circular Dependencies

When two modules depend on each other, you can encounter circular dependency issues. There are several ways to solve this:

1. **Forward Reference**

   Forward reference is a technique used in NestJS to handle circular dependencies between modules or services. When two modules depend on each other, you can use `forwardRef()` to tell NestJS to resolve the dependency after both modules are initialized.

   For example, if Module A depends on Module B and Module B depends on Module A, you would use `forwardRef()` in both modules to break the circular dependency:

   ```typescript
   // In Module A
   @Inject(forwardRef(() => ModuleB))
   private moduleB: ModuleB;

   // In Module B
   @Inject(forwardRef(() => ModuleA))
   private moduleA: ModuleA;
   ```

   This tells NestJS to resolve these dependencies after both modules are initialized, preventing the circular dependency error.

   ```typescript
   @Inject(forwardRef(() => OtherService))
   ```

2. **Module Reorganization**

   - Move shared functionality to a separate module
   - Use a shared service to break the circular dependency

3. **Interface-based Design**
   - Define interfaces for the dependencies
   - Use dependency injection with interfaces

## Best Practices

1. Keep modules focused and single-responsibility
2. Use feature modules to organize related functionality
3. Avoid circular dependencies when possible
4. Use dependency injection to manage service instances
5. Keep controllers thin and move business logic to services

## Useful Links

- [NestJS Modules Documentation](https://docs.nestjs.com/modules)
- [NestJS Dependency Injection](https://docs.nestjs.com/providers)
- [NestJS Circular Dependency](https://docs.nestjs.com/fundamentals/circular-dependency)

## CLI Commands Used

```bash
# Create new NestJS project
nest new .

# Generate modules
nest generate module products
nest generate module orders

# Generate controllers
nest generate controller products
nest generate controller orders

# Generate services
nest generate service products
nest generate service orders
```
