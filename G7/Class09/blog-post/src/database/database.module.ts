import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.getOrThrow('DATABASE_NAME'),
          username: configService.getOrThrow('DATABASE_USER'),
          password: 'postgres',
          autoLoadEntities: true,
          synchronize: configService.getOrThrow('ENVIRONMENT') !== 'production',
          host: configService.getOrThrow('DATABASE_HOST'),
          port: configService.getOrThrow('DATABASE_PORT'),
        };

        // return {
        //   type: 'postgres',
        //   database: configService.get('DATABASE_NAME'),
        //   username: configService.get('DATABASE_USER'),
        //   password: configService.get('DATABASE_PASSWORD'),
        //   autoLoadEntities: true,
        //   synchronize: process.env.NODE_ENV !== 'production',
        //   host: configService.get('DATABASE_HOST'),
        //   port: configService.get('DATABASE_PORT'),
        // };
      },

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
