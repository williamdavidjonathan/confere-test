import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './repository/Address.repository';
import { DatabaseModule } from 'src/_database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
})
export class AddressModule {}
