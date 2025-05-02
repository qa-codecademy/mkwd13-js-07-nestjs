import { Injectable } from "@nestjs/common";
import { tasks } from "./data"

@Injectable()// allows us to inject this class in other services/classes(controllers)
// The @Injectable() decorator tells the dependency injection mechanism
// that this class is injectable, meaning it can be injected in controllers, other services etc.
export class TasksService {
    private data = tasks;

    list(){
        return this.data
    }

    getById(id: number){
        const task = this.data.find((task) => task.id === id);

        return task
    }
}