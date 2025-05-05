import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { CommonModule } from "src/common/common.module";

// Feature modules
@Module({
    // when we imported CommonModule, we are importing the functionality and availability of the CommonService
    imports: [CommonModule], 
    exports: [],
    controllers: [TasksController],
    /**
   * HOW DI Work TasksService
   * 1. When module gets instantiated, the DI container creates instance of the TasksController
   * 2. It will recognize that the app controller needs/requires instances of TasksService
   * 3. So creates instance of both and passes them to the controller
   *
   * It is a design pattern that simplifies the management of dependencies between components in app.
   * It allows the components to rely on the DI container to provide them the instances, without requiring to create on themselves.
   *
   * Nest will either create an instance of the Service and cache it and return it, or if one is already existing it will return the existing instance
   */
    providers: [TasksService]
})
export class TasksModule{}