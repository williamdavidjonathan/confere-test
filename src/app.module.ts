import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteModule } from './route/route.module';
import { ClientModule } from './client/client.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './_database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    RouteModule,
    ClientModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
