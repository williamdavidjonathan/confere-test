import { Injectable, HttpException } from '@nestjs/common';
import axios, { HttpStatusCode } from 'axios';
import { AddressRepository } from './repository/Address.repository';
import { CreateAddressDto } from './dto/create-Address.dto';
import { UpdateAddressDto } from './dto/update-Address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) {}

  // ADICIONA NOVO AddressE
  async create(createAddressDto: CreateAddressDto) {
    const cep = createAddressDto.cep.replace('-', '');
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
      createAddressDto.logradouro = getByCep.logradouro;
      createAddressDto.bairro = getByCep.bairro;
      createAddressDto.cidade = getByCep.localidade;
      createAddressDto.estado = getByCep.uf;
      createAddressDto.complemento = getByCep.complemento;

      try {
        await this.repository.createAddress(createAddressDto);
        return 'Endereço salvo com sucesso';
      } catch (error) {
        console.log(error);
        throw new HttpException(
          'Falha ao salvar Endereço',
          HttpStatusCode.BadRequest,
        );
      }
    }
  }

  // RETORNA TODOS OS AddressES
  async findAll() {
    try {
      const result = await this.repository.getAllAddresses();
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao retornar todos os endereços',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA UM ENDEREÇO ESPECIFICO PELO ID
  async findOne(id: number) {
    try {
      const result = await this.repository.getAddressById(id);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao selecionar endereço',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // RETORNA TODOS OS ENDEREÇOS DE UM CLIENTE ESPECIFICO
  async findAllAddressesByClient(clientid: number) {
    try {
      const result = await this.repository.getAddressesByClient(clientid);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao selecionar endereços do cliente',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // ATUALIZA UM ENDEREÇO ESPECIFICO PELO ID
  async update(id: number, updateAddressDto: UpdateAddressDto) {
    if (updateAddressDto.cep) {
      const cep = updateAddressDto.cep.replace('-', '');
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
        updateAddressDto.logradouro = getByCep.logradouro;
        updateAddressDto.bairro = getByCep.bairro;
        updateAddressDto.cidade = getByCep.localidade;
        updateAddressDto.estado = getByCep.uf;
        updateAddressDto.complemento = getByCep.complemento;
      }
    }
    try {
      const result = await this.repository.updateAddress(id, updateAddressDto);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao atualizar endereço',
        HttpStatusCode.BadRequest,
      );
    }
  }

  // REMOVE UM ENDEREÇO ESPECIFICO PELO ID
  async remove(id: number) {
    try {
      await this.repository.deleteAddress(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao deletar endereço',
        HttpStatusCode.BadRequest,
      );
    }
  }
}
