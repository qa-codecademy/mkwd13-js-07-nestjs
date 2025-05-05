import { Controller, Get, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CommonService } from 'src/common/common.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private commonService: CommonService
    ){}

    @Get()
    listUsers(){
        return this.usersService.list()
    }

    @Get(':id')
    getDetails(@Param('id') id: string, @Res() response: Response){
        const parsedID = +id;

        const isIdInvalid = !this.commonService.validateID(parsedID);

        if(isIdInvalid){
            return response.status(400).send({message: 'Negative numbers cannot be used as id.'})
        }
        const user = this.usersService.getById(parsedID)
        
        if(!user){
            return response.status(404).send({message: `User with id: ${parsedID} does not exist.`})
        }

        return response.send(user)
    }
}
