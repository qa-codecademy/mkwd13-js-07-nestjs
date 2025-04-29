import { Controller, Get, Post, Body } from '@nestjs/common';

interface UserBody {
    fullName: string,
    email: string
}

interface User {
    id: number
    fullName: string
    email: string
};


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

    @Post()
    create(@Body() { fullName, email }: UserBody){
        const newUser: User = {
            id: this.users.length + 1,
            fullName,
            email
        };

        this.users.push(newUser)

        return newUser
    }
}
