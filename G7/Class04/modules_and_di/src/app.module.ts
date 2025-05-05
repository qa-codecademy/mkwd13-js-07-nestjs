import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

// @Module is decorator so we can define a module in NESTjs. A module is a collection of related classes
// that are grouped together for a specific purpose

// Each app has at least 1 module. The root module like this one.
// the root module is important  and is the starting point for nest to run our app.
// Small applications may have 1 module =)
// but biger, more complex application have lots of modules

// The @Module() decorator takes a single object whose properties describe the module:

// Imports:
// In a module, imports are used to import and use other modules in the application. This allows the module to use functionality provided by other modules that it needs to function properly.
// For example, a module might import the HttpModule to use HTTP functionality in its controllers.

// Controllers:
// Controllers are responsible for handling incoming requests and generating responses. They are the entry point for incoming requests and define the HTTP routes for the application.
// Controllers are defined as classes with methods that are decorated with HTTP request method decorators like @Get(), @Post(), @Put(), @Delete(), etc.
// These decorators define the HTTP method and route for the controller method to handle.

// Providers:
// Providers are classes that can be injected into other classes. They are responsible for providing functionality and services to other parts of the application.
// Providers can be used to connect to databases, external APIs, or perform other tasks required by the application. Providers can be injected into controllers, other providers, or other parts of the application.

// Exports:
// Exports are used to make components from a module available to other modules. When a component is exported from a module, it can be used by other modules that import the module.
// For example, if a module defines a controller that needs to be used by another module, the controller can be exported from the module and then imported by the other module.

@Module({
  imports: [TasksModule, UsersModule, CommonModule],
  exports: [],
  controllers: [AppController],

  providers: [AppService], //  classes that are decorated with @Injectable
})
export class AppModule {}
