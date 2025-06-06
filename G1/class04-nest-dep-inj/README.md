NestJS has a predefined project structure that helps in organizing the application in a scalable and maintainable way. The main elements of this structure include:

- **src** (Source directory): Contains the application's source code.
  - **modules**: Each feature of the application is organized into modules.
  - **controllers**: Responsible for handling incoming requests and returning responses to the client.
  - **services/providers**: Contain business logic and can be injected into controllers.
- **main.ts**: The entry file of the application which uses the core function `NestFactory` to create a NestJS application.

## Nest CLI

- To work with nest we must install the nest cli with the command `npm i -g @nestjs/cli`
- To check if nest is installed properly run the command `nest -v` which will return the version of nest/cli installed.
- To create a new project run the command `nest new project_name`.
  - HINT: whenever we create new project, nest by default will initialize `.git` file. If you want to prevent this craete new project with the command `nest new project_name --skip-git`
- To use the nest/cli to create a module run the command: `nest g module [module_name]`
- To use the nest/cli to create a service run the command: `nest g service [service_name]`
- To use the nest/cli to create a controller run the command: `nest g module [controller_name]`

## Decorators

Decorators are a TypeScript feature used extensively in NestJS to enhance classes, methods, and properties without modifying their actual implementation. They are used for:

- **Routing**: Decorators like `@Controller`, `@Get`, `@Post`, etc., define routes and request methods.
- **Dependency Injection**: Decorators like `@Injectable` mark a class as a provider that can be injected into other classes.
- **Modules**: The `@Module` decorator defines a module by encapsulating providers, controllers, and imported modules.

## Dependency injection

Dependency Injection (DI) is a design pattern in which a class requests dependencies from external sources rather than creating them. NestJS DI system is robust and core to its architecture, allowing for loose coupling and enhanced modularity. Classes such as services can be injected into consumers, typically controllers, via the constructor, allowing for easy testing and separation of concerns.

A module class can inject providers as well (e.g., for configuration purposes):

```javascript
import { Module } from '@nestjs/common';
import { ProductsController } from './Products.controller';
import { ProductsService } from './Products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  constructor(private ProductsService: ProductsService) {}
}
```

### DI fundamentals

Dependency injection is an inversion of control (IoC) technique wherein you delegate instantiation of dependencies to the IoC container (in our case, the NestJS runtime system), instead of doing it in your own code imperatively. Let's examine what's happening in this example from the Providers chapter.

First, we define a provider. The @Injectable() decorator marks the ProductsService class as a provider.

```javascript
import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/Product.interface';

@Injectable()
export class ProductsService {
  private readonly Products: Product[] = [];

  findAll(): Product[] {
    return this.Products;
  }
}
```

Then we request that Nest inject the provider into our controller class:

```javascript
import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { Product } from './interfaces/Product.interface';

@Controller('Products')
export class ProductsController {
  constructor(private ProductsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.ProductsService.findAll();
  }
}
```

Finally, we register the provider with the Nest IoC container:

```javascript
import { Module } from '@nestjs/common';
import { ProductsController } from './Products/Products.controller';
import { ProductsService } from './Products/Products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
```

What exactly is happening under the covers to make this work? There are three key steps in the process:

1. In Products.service.ts, the @Injectable() decorator declares the ProductsService class as a class that can be managed by the Nest IoC container.
2. In Products.controller.ts, ProductsController declares a dependency on the ProductsService token with constructor injection:

```javascript
  constructor(private ProductsService: ProductsService)
```

3. In app.module.ts, we associate the token ProductsService with the class ProductsService from the Products.service.ts file. We'll see below exactly how this association (also called registration) occurs.

When the Nest IoC container instantiates a ProductsController, it first looks for any dependencies\*. When it finds the ProductsService dependency, it performs a lookup on the ProductsService token, which returns the ProductsService class, per the registration step (#3 above). Assuming SINGLETON scope (the default behavior), Nest will then either create an instance of ProductsService, cache it, and return it, or if one is already cached, return the existing instance.

## Modules

A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

Each application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies. While very small applications may theoretically have just the root module, this is not the typical case. We want to emphasize that modules are strongly recommended as an effective way to organize your components. Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

Modules are the backbone of a NestJS application, organizing the app into discrete blocks of functionality. A module is defined with the `@Module` decorator, which takes an object with properties to describe the module:

- **imports**: Other modules whose exported providers are needed by this module.
- **controllers**: The set of controllers that belong to this module.
- **providers**: The providers that will be instantiated by the Nest injector and that can be shared within this module and potentially exported for other modules.
- **exports**: The subset of providers that are provided by this module and should be available in other modules which import this module.

### Import Array

The `imports` array allows a module to include functionality from other modules. It enables the reuse of common services or components across the application, fostering modularity and maintainability.

### Controllers Array

The `controllers` array within a module defines the set of controllers that are responsible for handling incoming requests related to the module's domain.

### Providers Array

The `providers` array is used to define instances that can be injected into other parts of the application, such as services, repositories, factories, helpers, and more. These providers can be made available both within the module and, optionally, exported to be used in other modules.

- exports the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)

The module encapsulates providers by default. This means that it's impossible to inject providers that are neither directly part of the current module nor exported from the imported modules. Thus, you may consider the exported providers from a module as the module's public interface, or API.

### Exports Array

The `exports` array in a module specifies which providers are to be exported out of the module, making them available to other modules that import this module. This is crucial for sharing services and components across different parts of the application. Only the providers listed in the `exports` array can be injected into other modules, ensuring a controlled exposure of functionalities.