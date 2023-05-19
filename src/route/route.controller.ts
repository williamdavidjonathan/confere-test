import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  GetByIdResponse,
  NewRoute,
  ResponseGetBy,
  ResponseRoute,
} from './dto/route.model';

@Controller('route')
@ApiTags('Rotas')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @ApiParam({
    name: 'CreateRouteDto',
    description: 'Objeto contendo os dados da rota',
  })
  @ApiBody({ type: NewRoute })
  @ApiResponse({
    status: 201,
    description: 'Rota cadastrada com sucesso.',
    type: ResponseRoute,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Os dados inseridos são inválidos.',
  })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Todas as rotas retornou com sucesso.',
    type: ResponseGetBy,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao selecionar todas rotas',
  })
  findAll() {
    return this.routeService.findAll();
  }

  @Get('/address/:id')
  @ApiResponse({
    status: 200,
    description: 'As rotas do endereço retornou com sucesso.',
    type: ResponseGetBy,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao retornar rotas do endereço.',
  })
  findAllRoutesByAddress(@Param('id') id: string) {
    return this.routeService.findAllRoutesByAddress(+id);
  }

  @Get('/Route/:id')
  @ApiResponse({
    status: 200,
    description: 'As rotas do cliente retornou com sucesso.',
    type: ResponseGetBy,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao retornar rotas do cliente.',
  })
  findAllRoutesByClient(@Param('id') id: string) {
    return this.routeService.findAllRoutesByClient(+id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'As rotas do cliente retornou com sucesso.',
    type: GetByIdResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao retornar rotas do cliente.',
  })
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do valor a ser atualizado',
  })
  @ApiParam({
    name: 'updateAddressDto',
    description: 'Objeto contendo os dados do endereço',
    type: NewRoute,
  })
  @ApiResponse({
    status: 200,
    description: 'Rota atualizada com sucesso.',
    type: NewRoute,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao atualizar rota.',
  })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Id do valor a ser deletado',
  })
  @ApiResponse({
    status: 200,
    description: 'Rota deletada com sucesso.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro ao deletar rota.',
  })
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}
