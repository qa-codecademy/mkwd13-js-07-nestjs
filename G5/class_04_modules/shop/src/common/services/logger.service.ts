import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(location: string, message: string, data?: unknown) {
    console.log(`[${location}] ${message}`, data, new Date().toISOString());
  }
}
