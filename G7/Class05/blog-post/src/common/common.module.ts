import { Module } from '@nestjs/common';
import { EventLoggerService } from './event-logger.service';

@Module({
  providers: [EventLoggerService],
  exports: [EventLoggerService]
})
export class CommonModule {}
