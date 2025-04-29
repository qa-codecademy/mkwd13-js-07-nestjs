import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
    private users = [
        {id: 1, fullName: "John Doe", email: "john@mail.com"},
        {id: 2, fullName: "Bob Bobski", email: "bob@mail.com"}
    ]

    @Get()
    findAll(){
        return this.users
    }

    // TODO: Finish this route that creates a new user
    @Post()
    create(){}
}
