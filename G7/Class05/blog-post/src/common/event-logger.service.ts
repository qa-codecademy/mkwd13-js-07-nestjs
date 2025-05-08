import { Injectable } from '@nestjs/common';

@Injectable()
export class EventLoggerService {

    log(type: 'INFO' | 'WARNING' | 'ERROR', message: string){
        if(type === "INFO"){
            console.log(`ℹ️ ${message}`);
        }

        if(type === "WARNING"){
            console.log(`⚠️ ${message}`);
        }

        if(type === "ERROR"){
            console.log(`❌ ${message}`);
        }
    }
}
