import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection,
  ) {}

  // ADICIONA NOVO CLIENTE
  createClient = async (client: CreateClientDto) => {
    try {
      const query = `INSERT INTO clients (nome, sobrenome, dataNascimento, email, cep, numeroDaResidencia, logradouro, bairro, cidade, estado, complemento)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        client.nome,
        client.sobrenome,
        client.dataNascimento,
        client.email,
        client.cep,
        client.numeroDaResidencia,
        client.logradouro,
        client.bairro,
        client.cidade,
        client.estado,
        client.complemento || null,
      ];
      const result = this.connection.execute(query, values);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao salvar cliente');
    }
  };

  // RETORNA TODOS OS CLIENTES
  getAllClients = async () => {
    try {
      const query = 'SELECT * FROM clients';
      const result = this.connection.execute(query);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao retornar clientes');
    }
  };

  // SELECIONA CLIENTE PELO ID
  getClientById = async (id: number) => {
    try {
      const query = 'SELECT * FROM clients WHERE id = ?';
      const result = this.connection.execute(query, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao selecionar cliente');
    }
  };

  // ATUALIZA UM CLIENTE PELO ID
  updateClient = async (id: number, client: UpdateClientDto) => {
    try {
      const fieldsToUpdate = Object.entries(client)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${key} = ?`);
      const values = Object.values(client).filter(
        (value) => value !== undefined,
      );
      values.push(id);

      if (fieldsToUpdate.length === 0) {
        return;
      }

      const query = `
      UPDATE clients
      SET ${fieldsToUpdate.join(', ')}
      WHERE id = ?
    `;

      const result = await this.connection.execute(query, values);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao atualizar cliente');
    }
  };

  // REMOVE UM CLIENTE PELO ID
  deleteClient = async (id: number) => {
    try {
      const query = 'DELETE FROM clients WHERE id = ?';
      const result = this.connection.execute(query, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao deletar cliente');
    }
  };
}
