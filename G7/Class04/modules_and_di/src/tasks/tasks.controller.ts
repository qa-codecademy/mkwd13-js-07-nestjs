import { Controller, Get, Param, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Response } from 'express';
import { CommonService } from 'src/common/common.service';


@Controller('tasks')
export class TasksController {
    
    // private tasksService = new TasksService()
    constructor(private tasksService: TasksService, private commonService: CommonService){}

    // localhost:3000/tasks & http method === GET
    @Get()
    listAll(){
        return this.tasksService.list()
    }


    @Get(':id')
    getDetails(@Param('id') id: string, @Res() response: Response){
        const parseID = +id;
        console.log("parseID", parseID);

        const isIdInvalid = !this.commonService.validateID(parseID);

        if(isIdInvalid){
            return response.status(400).send({message: 'Negative number cannot be used as id'})
        }

        const task = this.tasksService.getById(parseID);

        if(!task){
            return response.status(404).send({ message: `Task with id: ${parseID} not found.` })
        }

        return response.send(task)
    }
};
