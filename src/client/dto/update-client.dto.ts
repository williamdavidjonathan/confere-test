import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsString()
  nome?: string;

  @IsString()
  sobrenome?: string;

  @IsEmail()
  email?: string;

  @IsDateString()
  dataNascimento?: string;

  @IsString()
  cep?: string;

  @IsString()
  logradouro?: string;

  @IsNumber()
  numeroDaResidencia?: number;

  @IsString()
  complemento?: string;

  @IsString()
  bairro?: string;

  @IsString()
  cidade?: string;

  @IsString()
  estado?: string;
}
