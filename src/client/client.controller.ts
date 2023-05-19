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
  ApiBadRequestResponse,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './dto/client.model';

@Controller('client')
@ApiTags('Clientes')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiParam({
    name: 'CreateClientDto',
    description: 'Objeto contendo os dados do cliente',
  })
  @ApiBody({ type: Client })
  @ApiResponse({
    status: 201,
    description: 'Cliente cadastrado com sucesso.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Os dados inseridos são inválidos.',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retornou todos os clientes.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao retornar todos os clientes.',
  })
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Retornou todos os clientes.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao retornar todos os clientes.',
  })
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do valor a ser atualizado',
  })
  @ApiParam({
    name: 'updateAddressDto',
    description: 'Objeto contendo os dados do endereço',
    type: Client,
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do valor a ser deletado',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente deletado com sucesso.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao deletar cliente.',
  })
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
