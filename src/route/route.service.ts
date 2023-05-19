import { Injectable, HttpException } from '@nestjs/common';
import axios, { HttpStatusCode } from 'axios';
import { RouteRepository } from './repository/Route.repository';
import { CreateRouteDto } from './dto/create-Route.dto';
import { UpdateRouteDto } from './dto/update-Route.dto';

@Injectable()
export class RouteService {
  constructor(private readonly repository: RouteRepository) {}

  // ADICIONA NOVA ROTA
  async create(createRouteDto: CreateRouteDto) {
    try {
      await this.repository.createRoute(createRouteDto);
      return 'Rota salvo com sucesso';
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao salvar Rota',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA TODOS OS RouteES
  async findAll() {
    try {
      const result = await this.repository.getAllRoutes();
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao retornar todos os Rotas',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA UM Rota ESPECIFICO PELO ID
  async findOne(id: number) {
    try {
      const result = await this.repository.getRouteById(id);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao selecionar Rota',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA TODOS OS RotaS DE UM CLIENTE ESPECIFICO
  async findAllRoutesByAddress(clientid: number) {
    try {
      const result = await this.repository.getRoutesByAddress(clientid);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao selecionar rotas do endereço',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA TODOS OS ROTAS DE UM CLIENTE ESPECIFICO
  async findAllRoutesByClient(clientid: number) {
    try {
      const result = await this.repository.getRoutesByClient(clientid);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao selecionar rotas do cliente',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // ATUALIZA UM Rota ESPECIFICO PELO ID
  async update(id: number, updateRouteDto: UpdateRouteDto) {
    try {
      const result = await this.repository.updateRoute(id, updateRouteDto);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao atualizar Rota',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // REMOVE UM Rota ESPECIFICO PELO ID
  async remove(id: number) {
    try {
      await this.repository.deleteRoute(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao deletar Rota',
        HttpStatusCode.BadRequest,
      );
    }
  }
}
