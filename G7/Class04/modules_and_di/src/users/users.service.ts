import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {id: 1, email: "johndoe@mail.com", username: 'john_john'},
        {id: 2, email: "bob@mail.com", username: 'bob_bobski'}
    ]

    list(){
        return this.users
    }

    getById(id: number){
        const user = this.users.find((user) => user.id === id);

        return user
    }
}
