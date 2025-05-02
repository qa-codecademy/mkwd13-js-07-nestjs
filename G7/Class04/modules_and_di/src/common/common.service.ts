import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

    validateID(id: number){
        // if id is more then 0 the id is valid (true)
        return id > 0
    }
}
