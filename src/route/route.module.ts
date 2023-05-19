import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { RouteRepository } from './repository/Route.repository';
import { DatabaseModule } from 'src/_database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RouteController],
  providers: [RouteService, RouteRepository],
})
export class RouteModule {}
