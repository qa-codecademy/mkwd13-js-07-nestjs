import { Injectable } from '@nestjs/common';

// @Service()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
