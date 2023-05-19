import { Inject, Injectable } from '@nestjs/common';
import { CreateRouteDto } from '../dto/create-Route.dto';
import { UpdateRouteDto } from '../dto/update-Route.dto';

@Injectable()
export class RouteRepository {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection,
  ) {}

  // ADICIONA NOVO ROTA
  createRoute = async (route: CreateRouteDto) => {
    try {
      const query = `INSERT INTO routes (nome, duracao, ponto_inicial)
                   VALUES (?, ?, ?)`;
      const values = [route.nome, route.duracao, route.ponto_inicial];
      const RouteResult = await this.connection.execute(query, values);
      const routeId = RouteResult[0].insertId;

      //INSERE OS ENDEÇOS SELECIONADOS NA ROTA
      const addressQuery = `INSERT INTO route_addresses (route_id, address_id) VALUES (?, ?)`;
      for (const addressId of route.enderecos) {
        const addressValues = [routeId, addressId];
        await this.connection.execute(addressQuery, addressValues);
      }
    } catch (error) {
      throw new Error('Falha ao inserir nova rota');
    }
  };

  // RETORNA TODOS OS ROTAS
  getAllRoutes = async () => {
    try {
      const query = `
        SELECT routes.*, address.titulo
        FROM routes
        LEFT JOIN route_addresses ON routes.id = route_addresses.route_id
        LEFT JOIN address ON address.id = route_addresses.address_id
      `;
      const result = this.connection.execute(query);
      return result;
    } catch (error) {
      throw new Error('Falha ao retornar Rotas');
    }
  };

  // SELECIONA ROTA PELO ID
  getRouteById = async (id: number) => {
    try {
      const query = 'SELECT * FROM routes WHERE id = ?';
      const result = this.connection.execute(query, [id]);
      return result;
    } catch (error) {
      throw new Error('Falha ao selecionar rota');
    }
  };

  // RETORNA TODOS AS ROTAS DE UM CLIENTE ESPECIFICO
  getRoutesByClient = async (clientId: number) => {
    try {
      const query = `
        SELECT routes.*, address.*
        FROM route_addresses
        INNER JOIN routes ON routes.id = route_addresses.route_id
        INNER JOIN address ON address.id = route_addresses.address_id
        WHERE address.client_id = ?
      `;
      const result = await this.connection.execute(query, [clientId]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  // RETORNA TODOS AS ROTAS DE UM ENDEREÇO ESPECIFICO
  getRoutesByAddress = async (addressId: number) => {
    try {
      const query = `
        SELECT routes.*, address.*
        FROM route_addresses
        INNER JOIN routes ON routes.id = route_addresses.route_id
        INNER JOIN address ON address.id = route_addresses.address_id
        WHERE route_addresses.address_id = ?
      `;
      const result = await this.connection.execute(query, [addressId]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  // ATUALIZA UM ROTA PELO ID
  updateRoute = async (id: number, route: UpdateRouteDto) => {
    try {
      const fieldsToUpdate = Object.entries(route)
        .filter(([key, value]) => value !== undefined && key !== 'enderecos')
        .map(([key, value]) => `${key} = ?`);
      const values = Object.values(route).filter(
        (value) => value !== undefined && !Array.isArray(value),
      );
      values.push(id);

      console.log(values);
      if (fieldsToUpdate.length === 0) {
        return;
      }

      const query = `
        UPDATE routes
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ?
      `;

      const result = await this.connection.execute(query, values);
      console.log('updated in the route', result);

      if (route.enderecos) {
        for (const enderecoId of route.enderecos) {
          const addressQuery = `
            UPDATE route_addresses
            SET address_id = ?
            WHERE route_id = ? AND address_id = ?
          `;

          const result = await this.connection.execute(addressQuery, [
            enderecoId,
            id,
            enderecoId,
          ]);
          console.log('updated in the route addresses', result);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao atualizar rota');
    }
  };

  // REMOVE UM ROTA PELO ID
  deleteRoute = async (id: number) => {
    try {
      const query = 'DELETE FROM routes WHERE id = ?';
      const result = this.connection.execute(query, [id]);
      return result;
    } catch (error) {
      throw new Error('Falha ao deletar ROTA');
    }
  };
}
