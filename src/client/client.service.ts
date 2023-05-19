import { HttpService } from '@nestjs/axios/dist';
import { Injectable, HttpException } from '@nestjs/common';
import axios, { HttpStatusCode } from 'axios';
import { lastValueFrom } from 'rxjs';
import { AppService } from 'src/app.service';
import { ClientRepository } from './repository/client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repository: ClientRepository,
    private readonly App: AppService,
  ) {}

  // ADICIONA NOVO CLIENTE
  async create(createClientDto: CreateClientDto) {
    const cep = createClientDto.cep.replace('-', '');
    const getByCep = await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        throw new HttpException('Cep inválido', HttpStatusCode.BadRequest);
      });

    //CONVERTE A DATA DE NASCIMENTO PARA PADRÃO DE DATA DO SQL
    const convertedDate = this.App.convertDate(createClientDto.dataNascimento);
    createClientDto.dataNascimento = convertedDate;

    //SET OS DADOS DO ENDEREÇO
    if (getByCep) {
      createClientDto.logradouro = getByCep.logradouro;
      createClientDto.bairro = getByCep.bairro;
      createClientDto.cidade = getByCep.localidade;
      createClientDto.estado = getByCep.uf;
      createClientDto.complemento = null;

      try {
        await this.repository.createClient(createClientDto);
        return 'Cliente salvo com sucesso';
      } catch (error) {
        console.log(error);
        throw new HttpException(
          'Falha ao salvar cliente',
          HttpStatusCode.BadRequest,
        );
      }
    }
  }

  // RETORNA TODOS OS CLIENTES
  async findAll() {
    try {
      const result = await this.repository.getAllClients();
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao retornar todos os clientes',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA UM CLIENTE ESPECIFICO PELO ID
  async findOne(id: number) {
    try {
      const result = await this.repository.getClientById(id);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao selecionar os cliente',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // ATUALIZA UM CLIENTE ESPECIFICO PELO ID
  async update(id: number, updateClientDto: UpdateClientDto) {
    if (updateClientDto.cep) {
      const cep = updateClientDto.cep.replace('-', '');
      const getByCep = await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((result) => {
          return result.data;
        })
        .catch(() => {
          throw new HttpException('Cep inválido', HttpStatusCode.BadRequest);
        });

      //SET OS DADOS DO ENDEREÇO
      if (getByCep) {
        updateClientDto.logradouro = getByCep.logradouro;
        updateClientDto.bairro = getByCep.bairro;
        updateClientDto.cidade = getByCep.localidade;
        updateClientDto.estado = getByCep.uf;
        updateClientDto.complemento = getByCep.complemento;
      }
    }

    //CONVERTE A DATA DE NASCIMENTO PARA PADRÃO DE DATA DO SQL
    if (updateClientDto.dataNascimento) {
      const convertedDate = this.App.convertDate(
        updateClientDto.dataNascimento,
      );
      updateClientDto.dataNascimento = convertedDate;
    }

    try {
      const result = await this.repository.updateClient(id, updateClientDto);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao atualizar todos os clientes',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // REMOVE UM CLIENTE ESPECIFICO PELO ID
  async remove(id: number) {
    try {
      await this.repository.deleteClient(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao deletar cliente',
        HttpStatusCode.BadRequest,
      );
    }
  }
}
