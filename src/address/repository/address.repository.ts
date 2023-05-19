import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressRepository {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection,
  ) {}

  // ADICIONA NOVO ENDEREÇO
  createAddress = async (Address: CreateAddressDto) => {
    try {
      const query = `INSERT INTO address (client_id, titulo, cep, numero, logradouro, bairro, cidade, estado, complemento)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        Address.clientId,
        Address.titulo,
        Address.cep,
        Address.numero,
        Address.logradouro,
        Address.bairro,
        Address.cidade,
        Address.estado,
        Address.complemento || null,
      ];
      const result = this.connection.execute(query, values);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // RETORNA TODOS OS ENDEREÇOS
  getAllAddresses = async () => {
    try {
      const query = 'SELECT * FROM address';
      const result = this.connection.execute(query);
      return result;
    } catch (error) {
      throw new Error('Falha ao retornar Endereços');
    }
  };

  // RETORNA TODOS OS ENDEREÇOS DE UM CLIENTE ESPECIFICO
  getAddressesByClient = async (clientId: number) => {
    try {
      const query = `SELECT address.*, clients.nome AS nome_do_cliente, clients.email AS email_do_cliente
      FROM address
      INNER JOIN clients ON address.client_id = clients.id
      WHERE address.client_id = ?`;
      const result = await this.connection.execute(query, [clientId]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  // SELECIONA UM ENDEREÇO PELO ID
  getAddressById = async (id: number) => {
    try {
      const query = 'SELECT * FROM address WHERE id = ?';
      const result = this.connection.execute(query, [id]);
      return result;
    } catch (error) {
      throw new Error('Falha ao selecionar endereço');
    }
  };

  // ATUALIZA UM ENDEREÇO PELO ID
  updateAddress = async (id: number, Address: UpdateAddressDto) => {
    try {
      const fieldsToUpdate = Object.entries(Address)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${key} = ?`);
      const values = Object.values(Address).filter(
        (value) => value !== undefined,
      );
      values.push(id);

      if (fieldsToUpdate.length === 0) {
        return;
      }

      const query = `
      UPDATE address
      SET ${fieldsToUpdate.join(', ')}
      WHERE id = ?
    `;

      const result = await this.connection.execute(query, values);
      return result;
    } catch (error) {
      throw new Error('Falha ao atualizar endereço');
    }
  };

  // REMOVE UM ENDEREÇO PELO ID
  deleteAddress = async (id: number) => {
    try {
      const query = 'DELETE FROM address WHERE id = ?';
      const result = this.connection.execute(query, [id]);
      return result;
    } catch (error) {
      throw new Error('Falha ao deletar endereço');
    }
  };
}
