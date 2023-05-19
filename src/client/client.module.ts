import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './repository/client.repository';
import { DatabaseModule } from 'src/_database/database.module';
import { HttpModule } from '@nestjs/axios';
import { AppService } from 'src/app.service';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, AppService],
})
export class ClientModule {}
