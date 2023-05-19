import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import {
  NewAddress,
  ResponseAddress,
  ResponseAddressGetBy,
} from './dto/address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
@ApiTags('Endereços')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiParam({
    name: 'CreateAddressDto',
    description: 'Objeto contendo os dados do endereço',
  })
  @ApiBody({ type: NewAddress })
  @ApiResponse({
    status: 201,
    description: 'Endereço cadastrado com sucesso.',
    type: NewAddress,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Os dados inseridos são inválidos.',
  })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Todos os endereços listados com sucesso.',
    type: ResponseAddress,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao listar endereços',
  })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Endereço do id retornado com sucesso.',
    type: ResponseAddressGetBy,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao selecionar endereço por id',
  })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Get('/all/:id')
  @ApiResponse({
    status: 200,
    description: 'Todos os endereços do cliente listados com sucesso.',
    type: ResponseAddress,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao listar endereços do cliente',
  })
  findAllAddressesByClient(@Param('id') id: string) {
    return this.addressService.findAllAddressesByClient(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do valor a ser atualizado',
  })
  @ApiParam({
    name: 'updateAddressDto',
    description: 'Objeto contendo os dados do endereço',
    type: NewAddress,
  })
  @ApiResponse({
    status: 200,
    description: 'Endereço atualizado com sucesso.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao atualizar endereço.',
  })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do valor a ser deletado',
  })
  @ApiResponse({
    status: 200,
    description: 'Endereço deletado com sucesso.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao deletar endereço.',
  })
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
