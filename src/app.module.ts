import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/MongooseConfigService';
import Configuration from './config/configuration';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    ConfigModule.forRoot({
      load: [Configuration]
    }),
    TrackModule
  ]
})
export class AppModule {
}